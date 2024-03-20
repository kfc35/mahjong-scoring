import { HandAnalyzer } from "service/handAnalyzer/hk/handAnalyzer";
import { Hand } from "model/hand/hk/hand"
import Meld from "model/meld/meld";
import { StandardWinningHand } from "model/hand/hk/standardWinningHand"
import { analyzeForHonorMelds } from "service/handAnalyzer/base/standardWinningHandAnalyzer/meldsAnalyzer/honorMeldsAnalyzer/honorMeldsAnalyzer";
import { analyzeForNonKnittedSuitedMelds } from "service/handAnalyzer/base/standardWinningHandAnalyzer/meldsAnalyzer/suitedMeldsAnalyzer/nonKnittedSuitedMeldsAnalyzer";
import { cartesianProduct, meldsHasOnePair, meldsNumKongs, meldsNumTiles, meldsAreSubset, toTiles, meldHasTile, meldExistsInMelds } from "common/meldUtils";
import { TileToQuantityMap } from "model/hand/hk/tileQuantityMap";
import { handMinLength } from "model/hand/hk/handConstants";

export const analyzeForFiveMeldsNoKnitted : HandAnalyzer<StandardWinningHand> = (hand: Hand) => {
    // all other standard winning hands (4 non-pair melds and 1 pair meld).
    // Overall, navigate greedily, filter bad combos at the end.
    
    const honorMelds = analyzeForHonorMelds(hand);
    const suitedMelds = analyzeForNonKnittedSuitedMelds(hand);
    const numKongs = hand.getTotalQuantity() - handMinLength;
    const possibleMeldCombinations = cartesianProduct(honorMelds, suitedMelds);

    return possibleMeldCombinations
    // one pair and four non pairs, with the correct number of kongs.
    .filter(melds => meldsHasOnePair(melds))
    .filter(melds => melds.length === 5)
    .filter(melds => meldsNumKongs(melds) === numKongs)
    // all tiles in the hand should be represented within the melds
    .filter(melds => meldsNumTiles(melds) === hand.getTotalQuantity())
    .filter(melds => {
        const meldTiles = toTiles(melds);
        const meldTileQuantityMap = new TileToQuantityMap(meldTiles);
        return meldTiles.every(tile => meldTileQuantityMap.getQuantity(tile) === hand.getQuantity(tile))
    })
    // if the hand has prespecified melds, they must be present in the possible meld combo.
    // "melds" all have exposed = false, so we first test for equality without comparing the exposed flag.
    .filter(melds => meldsAreSubset(melds, hand.preSpecifiedMelds, true))
    // ensure any melds have the same exposed flag as their corresponding pre specified meld
    .map(melds => overwriteCommonMelds(melds, hand.preSpecifiedMelds))
    // mark the most recent tile correctly in each possible meld combo.
    // this itself can create different winning hands depending on 
    // which meld we choose to complete with the last tile.
    .map(melds => 
        melds.filter(meld => meldHasTile(meld, hand.mostRecentTile))
        // if the meld is self drawn but exposed, and the meld is as desired from preSpecifiedMelds, that's not valid
        .filter(meld => !(hand.mostRecentTileIsSelfDrawn && meld.exposed && meldExistsInMelds(hand.preSpecifiedMelds, meld)))
        // if the meld is from discard but not exposed, and the meld is as desired from preSpecifiedMelds), that is also not valid.
        .filter(meld => !(!hand.mostRecentTileIsSelfDrawn && !meld.exposed && meldExistsInMelds(hand.preSpecifiedMelds, meld)))
        .map((meld, index) => {
            const meldWithWinningTile : Meld = (meldExistsInMelds(hand.preSpecifiedMelds, meld) ? meld : 
                // since meld was not predefined, create a clone with the appropriate enabled flag depending on whether it was self drawn.
                (hand.mostRecentTileIsSelfDrawn ? meld.clone(false) : meld.clone(true)));
            const meldsCopy = [...melds];
            meldsCopy.splice(index, 1, meldWithWinningTile)
            return new StandardWinningHand(meldsCopy, meldWithWinningTile, hand.mostRecentTile, hand.flowerTiles)
        })
    )
    .reduce<StandardWinningHand[]>((accum, winningHands) => accum.concat(...winningHands), [])
}

// if a meld in meldsWithDesiredExposedFlag has an equivalent meld in meldsToOverwrite (minus the exposed flag), 
// the equivalent meld is replaced. 
function overwriteCommonMelds(meldsToOverwrite: Meld[], meldsWithDesiredExposedFlag: Meld[]) {
    const copy = [...meldsToOverwrite];
    for (const replacer of meldsWithDesiredExposedFlag) {
        for (let i = 0; i < copy.length; i++) {
            if (replacer.equals(copy[i], true)) {
                copy.splice(i, 1);
                break;
            }
        }
    }
    return [...copy, ...meldsWithDesiredExposedFlag];
}