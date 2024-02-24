import { HandAnalyzer } from "service/handAnalyzer/hk/handAnalyzer";
import { Hand } from "model/hand/hk/hand"
import { StandardWinningHand } from "model/hand/hk/standardWinningHand"
import { analyzeForHonorMelds } from "service/handAnalyzer/hk/standardWinningHandAnalyzer/meldsAnalyzer/honorMeldsAnalyzer/honorMeldsAnalyzer";
import { analyzeForSuitedMelds } from "service/handAnalyzer/hk/standardWinningHandAnalyzer/meldsAnalyzer/suitedMeldsAnalyzer/suitedMeldsAnalyzer";
import { cartesianProduct, meldsHasOnePair, meldsNumKongs, meldsNumTiles, meldsAreSubset, toTiles } from "common/meldUtils";
import { TileToQuantityMap } from "model/hand/hk/tileQuantityMap";
import { handMinLength } from "model/hand/hk/handConstants";

export const analyzeForFourNonPairMeldsAndOnePair : HandAnalyzer<StandardWinningHand> = (hand: Hand) => {
    // all other standard winning hands (4 non-pair melds and 1 pair meld).
    // Overall, navigate greedily, filter bad combos at the end.
    
    const honorMelds = analyzeForHonorMelds(hand);
    const suitedMelds = analyzeForSuitedMelds(hand);
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
    .filter(melds => meldsAreSubset(melds, hand.preSpecifiedMelds))
    .map(melds => new StandardWinningHand(melds,hand.flowerTiles))
}