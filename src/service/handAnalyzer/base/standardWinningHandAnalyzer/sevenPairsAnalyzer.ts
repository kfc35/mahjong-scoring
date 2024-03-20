import { HandAnalyzer } from "service/handAnalyzer/hk/handAnalyzer";
import { Hand } from "model/hand/hk/hand";
import Meld from "model/meld/meld";
import Pair from "model/meld/pair";
import { isSuitedOrHonorTile } from "model/tile/group/suitedOrHonorTile";
import { StandardWinningHand } from "model/hand/hk/standardWinningHand";
import { meldsNotNullAndCorrectLength } from "common/meldUtils";

export const analyzeForSevenPairs = constructSevenPairsAnalyzer();

function constructSevenPairsAnalyzer() : HandAnalyzer<StandardWinningHand> {
    return (hand: Hand) => {
        if (hand.getQuantityPerUniqueTile().every(quantity => quantity % 2 === 0)) {
            const melds : Meld[] = [];
            let winningPair : Pair | undefined = undefined;
            for (const [quantity, tileArray] of hand.getQuantityToTileMap().entries()) {
                if (quantity === 2) {
                    for (const tile of tileArray) {
                        if (isSuitedOrHonorTile(tile)) {
                            const pair = new Pair(tile);
                            melds.push(pair);
                            if (hand.mostRecentTile.equals(tile)) {
                                winningPair = pair;
                            }
                        }
                    }
                }
                if (quantity === 4) {
                    for (const tile of tileArray) {
                        if (isSuitedOrHonorTile(tile)) {
                            const pair = new Pair(tile);
                            melds.push(pair);
                            melds.push(pair.clone());
                            if (hand.mostRecentTile.equals(tile)) {
                                winningPair = pair;
                            }
                        }
                    }
                }
            }
            if (!meldsNotNullAndCorrectLength(melds, 7) || !winningPair) {
                return [];
            }
            return [new StandardWinningHand(melds, winningPair, hand.mostRecentTile, hand.flowerTiles)];
        }
        return [];
    }
}