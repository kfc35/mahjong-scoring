import { HandAnalyzer } from "service/handAnalyzer/hk/handAnalyzer";
import { Hand } from "model/hand/hk/hand";
import Meld from "model/meld/meld";
import Pair from "model/meld/pair";
import { isSuitedOrHonorTile } from "model/tile/group/suitedOrHonorTile";
import { StandardWinningHand } from "model/hand/hk/standardWinningHand";
import { meldsAreSubset, meldsNotNullAndCorrectLength } from "common/meldUtils";

export const analyzeForSevenPairs = constructSevenPairsAnalyzer();

function constructSevenPairsAnalyzer() : HandAnalyzer<StandardWinningHand> {
    return (hand: Hand) => {
        if (!!hand.preSpecifiedMelds && !hand.preSpecifiedMelds.every(meld => meld instanceof Pair)) {
            return [];
        }
        if (hand.getQuantityPerUniqueTile().every(quantity => quantity % 2 === 0)) {
            const melds : Meld[] = [];
            let winningPair : Pair | undefined = undefined;
            for (const [quantity, tileArray] of hand.getQuantityToTileMap().entries()) {
                if (quantity === 2) {
                    for (const tile of tileArray) {
                        if (isSuitedOrHonorTile(tile)) {
                            if (hand.mostRecentTile.equals(tile)) {
                                winningPair = new Pair(tile, !hand.mostRecentTileIsSelfDrawn);
                                melds.push(winningPair);
                            } else {
                                melds.push(new Pair(tile));
                            }
                            
                        }
                    }
                }
                if (quantity === 4) {
                    for (const tile of tileArray) {
                        if (isSuitedOrHonorTile(tile)) {
                            if (hand.mostRecentTile.equals(tile)) {
                                winningPair = new Pair(tile, !hand.mostRecentTileIsSelfDrawn);
                                melds.push(winningPair);
                            } else {
                                melds.push(new Pair(tile));
                            }
                            // second pair since quantity = 4
                            melds.push(new Pair(tile));
                        }
                    }
                }
            }
            if (!meldsNotNullAndCorrectLength(melds, 7) || !winningPair) {
                return [];
            }
            if (!meldsAreSubset(melds, hand.preSpecifiedMelds, false)) {
                return [];
            }
            return [new StandardWinningHand(melds, winningPair, hand.mostRecentTile, hand.flowerTiles)];
        }
        return [];
    }
}