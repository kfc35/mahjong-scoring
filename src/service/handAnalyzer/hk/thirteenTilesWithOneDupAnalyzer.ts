import { Hand } from "model/hand/hk/hand";
import { handMinLength } from "model/hand/hk/handConstants";
import { type HandAnalyzer } from "service/handAnalyzer/hk/handAnalyzer";
import { SuitedOrHonorTile } from "model/tile/group/suitedOrHonorTile";
import Pair from "model/meld/pair";
import { SpecialWinningHand } from "model/hand/hk/specialWinningHand";
import { assertTilesSuitedOrHonor, tilesUnique } from "common/tileUtils";
import { assertTilesNotNullAndCorrectLength } from "common/tileUtils";

export function constructThirteenTilesWithOneDupAnalyzer(thirteenUniqueTiles: SuitedOrHonorTile[]): HandAnalyzer {
    assertTilesSuitedOrHonor(thirteenUniqueTiles);
    assertTilesNotNullAndCorrectLength(thirteenUniqueTiles, handMinLength - 1, handMinLength - 1);
    if (!tilesUnique(thirteenUniqueTiles)) {
        throw new Error("There can only be one of each tile in thirteenUniqueTiles");
    }
    return (hand: Hand) => {
        let pair: Pair | undefined = undefined;
        const tiles: SuitedOrHonorTile[] = [];
        if (hand.getTotalQuantity() !== handMinLength) {
            return undefined;
        }
        for (const tile of thirteenUniqueTiles) {
            const quantity = hand.getQuantity(tile);
            if (quantity < 1 || quantity > 2) {
                return undefined;
            }
            if (quantity === 2 && !!pair) { // has more than one pair
                return undefined;
            }
            if (quantity === 2) {
                pair = new Pair(tile);
            }
            else { // quantity === 1
                tiles.push(tile);
            }
        }
        if (pair === undefined || tiles.length !== handMinLength - 1) {
            return undefined;
        }
        return new SpecialWinningHand(tiles, hand.flowerTiles, pair);
    };
}