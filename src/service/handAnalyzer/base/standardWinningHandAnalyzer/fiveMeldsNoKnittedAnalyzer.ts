import { HandAnalyzer } from "service/handAnalyzer/hk/handAnalyzer";
import { Hand } from "model/hand/hk/hand"
import { StandardWinningHand } from "model/hand/hk/standardWinningHand"
import { analyzeForHonorMelds } from "service/handAnalyzer/base/standardWinningHandAnalyzer/meldsAnalyzer/honorMeldsAnalyzer/honorMeldsAnalyzer";
import { analyzeForNonKnittedSuitedMelds } from "service/handAnalyzer/base/standardWinningHandAnalyzer/meldsAnalyzer/suitedMeldsAnalyzer/nonKnittedSuitedMeldsAnalyzer";
import { cartesianProduct, meldsHasOnePair, meldsNumKongs, meldsNumTiles, meldsAreSubset, overwriteExposedFlag, toTiles, meldHasTile } from "common/meldUtils";
import { TileToQuantityMap } from "model/hand/hk/tileQuantityMap";
import { handMinLength } from "model/hand/hk/handConstants";

export const analyzeForFiveMeldsNoKnitted : HandAnalyzer<StandardWinningHand> = (hand: Hand) => {
    // all other standard winning hands (4 non-pair melds and 1 pair meld).
    // Overall, navigate greedily, filter bad combos at the end.
    
    const honorMelds = analyzeForHonorMelds(hand);
    const suitedMelds = analyzeForNonKnittedSuitedMelds(hand);
    const numKongs = hand.getTotalQuantity() - handMinLength;
    const possibleMeldCombinations = cartesianProduct(honorMelds, suitedMelds);
    // TODO possible meld combinations can be expanded even further depending on what the last tile completes.
    
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
    .filter(melds => meldsAreSubset(melds, hand.preSpecifiedMelds, true))
    // ensure any melds have the same exposed flag as their corresponding pre specified meld
    .map(melds => overwriteExposedFlag(melds, hand.preSpecifiedMelds))
    // place the most recent tile correctly in each possible meld combo.
    // this itself can create different winning hands depending on 
    // which meld we choose to complete with the last tile.
    .map(melds => 
        // TODO fixstuff with prespecified melds and where the last tile fits in...
        melds.filter(meld => meldHasTile(meld, hand.mostRecentTile))
        //ensure the meld has a valid 
        .map(meld => {
            const meldWithWinningTile = (hand.mostRecentTileIsSelfDrawn ? meld : meld.clone(true));
            return new StandardWinningHand(overwriteExposedFlag(melds, [meldWithWinningTile]), 
                meldWithWinningTile, hand.mostRecentTile, hand.flowerTiles)
        })
    )
    .reduce<StandardWinningHand[]>((accum, winningHands) => accum.concat(...winningHands), [])
} 