import { HandAnalyzer } from "service/handAnalyzer/hk/handAnalyzer";
import { Hand } from "model/hand/hk/hand"
import Meld from "model/meld/meld";
import { StandardWinningHand } from "model/hand/hk/winningHand/standardWinningHand"
import { analyzeForHonorMelds } from "service/handAnalyzer/base/standardWinningHandAnalyzer/meldsAnalyzer/honorMeldsAnalyzer/honorMeldsAnalyzer";
import { analyzeForNonKnittedSuitedMelds } from "service/handAnalyzer/base/standardWinningHandAnalyzer/meldsAnalyzer/suitedMeldsAnalyzer/nonKnittedSuitedMeldsAnalyzer";
import { cartesianProduct, meldsHasOnePair, meldsNumKongs, meldsNumTiles, meldsAreSubset, toFlatTiles, meldHasTile, meldExistsInMelds, getIndexOfMeld } from "common/meldUtils";
import { TileToQuantityMap } from "model/tile/quantityMap/tileQuantityMap";
import { handMinLengthWithoutFlowers } from "model/hand/hk/handConstants";

export const analyzeForFiveMeldsNoKnitted : HandAnalyzer<StandardWinningHand> = (hand: Hand) => {
    // all other standard winning hands (4 non-pair melds and 1 pair meld).
    // Overall, navigate greedily, filter bad combos at the end.
    const honorMelds = analyzeForHonorMelds(hand);
    const suitedMelds = analyzeForNonKnittedSuitedMelds(hand);
    const possibleMeldCombinations = cartesianProduct(honorMelds, suitedMelds);

    const numKongs = hand.getTotalQuantity() - handMinLengthWithoutFlowers;
    return possibleMeldCombinations
    // one pair and four non pairs, with the correct number of kongs.
    .filter(melds => meldsHasOnePair(melds))
    .filter(melds => melds.length === 5)
    .filter(melds => meldsNumKongs(melds) === numKongs)
    // all tiles in the hand should be represented within the melds
    .filter(melds => meldsNumTiles(melds) === hand.getTotalQuantity())
    .filter(melds => {
        const meldTiles = toFlatTiles(melds);
        const meldTileQuantityMap = new TileToQuantityMap(meldTiles);
        return meldTiles.every(tile => meldTileQuantityMap.getQuantity(tile) === hand.getQuantity(tile))
    })
    // if the hand has user specified melds, they must be present in the possible meld combo.
    // "melds" all have exposed = false by default, so we first test for equality ignoring the exposed flag.
    .filter(melds => meldsAreSubset(melds, hand.userSpecifiedMelds, true))
    // ensure any melds have the same exposed flag as their corresponding user specified meld
    .map(melds => overwriteCommonMelds(melds, hand.userSpecifiedMelds))
    /* Different winning hands can be created depending on 
       which meld we choose to complete with the last tile (if we have that freedom).
       This whole map block is dealing with all those possibilities. */
    .map(melds => {
        const mostRecentTileUserSpecifiedMeld: Meld | undefined = hand.mostRecentTileUserSpecifiedMeld();
        if (mostRecentTileUserSpecifiedMeld) { // If this meld exists, the last tile should always be placed in this meld.
            const indexOfMeld = getIndexOfMeld(melds, mostRecentTileUserSpecifiedMeld);
            if (indexOfMeld === -1) {
                throw new Error('The mostRecentTileUserSpecifiedMeld is not in melds, which should not happen.');
            }
            // mostRecentTileUserSpecifiedMeld is guaranteed to be in `melds` since it was copied over as part of userSpecifiedMelds
            return [new StandardWinningHand(melds, indexOfMeld, hand.mostRecentTile(), hand.flowerTiles)]
        }
        // multiple winning hands are possible depending on which meld we choose to have the most recent tile.
        return melds.map((meld, index) => {
            if (!meldHasTile(meld, hand.mostRecentTile())) {
                return undefined;
            }
            // this meld contains the most recent tile, but was exposed by the user beforehand.
            if (meld.exposed && meldExistsInMelds(hand.userSpecifiedMelds, meld, false)) {
                return undefined;
            }

            // the self drawn most recent tile could be used to complete this concealed meld. the meld may or may not be user specified.
            if (!meld.exposed && hand.mostRecentTileIsSelfDrawn()) {
                // if the meld is user specified and does not want its tiles to be changed, return undefined.
                if (meldExistsInMelds(hand.userSpecifiedMelds, meld, false) && hand.lockConcealedSpecifiedMelds) {
                    return undefined;
                } else {
                    return new StandardWinningHand(melds, index, hand.mostRecentTile(), hand.flowerTiles);
                }
            }

            // the winning meld can be created via discard to make an exposed meld. the meld may or may not be user specified.
            if (!meld.exposed && !hand.mostRecentTileIsSelfDrawn()) { 
                // if the meld is user specified and does not want its exposed status modified, return undefined.
                if (meldExistsInMelds(hand.userSpecifiedMelds, meld, false) && hand.lockConcealedSpecifiedMelds) {
                    return undefined;
                } else {
                    const exposedMeld : Meld = meld.clone(true);
                    // replace the previously concealed meld with the exposed meld
                    const meldsCopy = [...melds];
                    meldsCopy.splice(index, 1, exposedMeld);
                    return new StandardWinningHand(meldsCopy, index, hand.mostRecentTile(), hand.flowerTiles);
                }
            }

            /* any other cases should not happen.
               the meld analyzation algorithm does not create exposed melds by itself.
               i.e. if meld.exposed === true && (hand.userSpecifiedMelds, meld, false) === false, something went wrong!
            */
            throw new Error(`This should not happen. An exposed meld was created in the algorithm and it wasn't defined by the user!`);
        }).filter(winningHands => !!winningHands)
    })
    .reduce<StandardWinningHand[]>((accum, winningHands) => accum.concat(...winningHands), [])
}

// if a meld in meldsWithDesiredExposedFlag has an equivalent meld in meldsToOverwrite (ignoring the exposed flag), 
// the equivalent meld is replaced.
function overwriteCommonMelds(meldsSuperset: Meld[], meldsWithDesiredExposedFlag: Meld[]) {
    const copy = [...meldsSuperset];
    for (const replacer of meldsWithDesiredExposedFlag) {
        let replacementSuccessful = false;
        for (let j = 0; j < copy.length; j++) {
            if (replacer.equals(copy[j], true)) {
                copy.splice(j, 1);
                replacementSuccessful = true;
                break;
            }
        }
        if (!replacementSuccessful) {
            throw new Error(`meldsSuperset is not a superset of meldsWithDesiredExposedFlag`);
        }
    }
    return [...copy, ...meldsWithDesiredExposedFlag];
}