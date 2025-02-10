import { MeldsAnalyzer } from "service/handAnalyzer/base/standardWinningHandAnalyzer/meldsAnalyzer/meldsAnalyzer";
import { Hand } from "model/hand/hk/hand";
import { type HonorTileGroup, HonorTileValue, isHonorTile } from "model/tile/group/honorTile";
import { TileGroup } from "model/tile/tileGroup";
import { dragonTileValues, windTileValues } from "model/tile/tileValue";
import { constructHonorTile } from "model/tile/group/honorTileConstructor";
import Meld from "model/meld/meld";
import Pair from "model/meld/pair";
import Pong from "model/meld/pong";
import Kong from "model/meld/kong";
import { meldsAreSubset } from "common/meldUtils";
import HonorTileValueQuantityMemo from "./honorTileValueQuantityMemo";

/* This logic assumes that the hand does not consist purely of pairs */
export const analyzeForHonorMelds : MeldsAnalyzer = (hand: Hand) => {
    const quantityMemo: HonorTileValueQuantityMemo = new HonorTileValueQuantityMemo(hand);

    const userSpecifiedHonorMelds = getUserSpecifiedHonorMelds(quantityMemo, hand.userSpecifiedMelds);
    const dragonMelds = getHonorMelds(quantityMemo, TileGroup.DRAGON, dragonTileValues);
    const windMelds = getHonorMelds(quantityMemo, TileGroup.WIND, windTileValues);
    
    const honorMelds: Meld[] = [];
    honorMelds.push(...userSpecifiedHonorMelds);
    honorMelds.push(...dragonMelds);
    honorMelds.push(...windMelds);

    if (!!hand.userSpecifiedMelds && !meldsAreSubset(hand.userSpecifiedMelds, honorMelds, true)) {
        return [];
    }

    return [honorMelds];
}

function getUserSpecifiedHonorMelds(quantityMap: HonorTileValueQuantityMemo, userSpecifiedMelds: Meld[]) {
    const userSpecifiedHonorMelds = userSpecifiedMelds.filter(meld => {
        const firstTile = meld.getFirstTile();
        if (isHonorTile(firstTile)) {
            return quantityMap.getQuantity(firstTile.value) >= meld.tiles.length;
        }
        return false;
    });
    
    userSpecifiedMelds.forEach(meld => {
        const firstTile = meld.getFirstTile();
        if (isHonorTile(firstTile)) {
            quantityMap.decreaseQuantity(firstTile.value, meld.tiles.length);
        }
    });

    return userSpecifiedHonorMelds.map(meld => meld.clone());
}

function getHonorMelds(quantityMap: HonorTileValueQuantityMemo, tileGroup: HonorTileGroup, tileValues: HonorTileValue[]) : Meld[] {
    const melds : Meld[] = [];
    for (const tileValue of tileValues) {
        const quantity = quantityMap.getQuantity(tileValue);
        const meld: Meld | undefined = getHonorMeldIfPossible(quantity, tileGroup, tileValue);
        if (meld) {
            melds.push(meld);
            quantityMap.decreaseQuantity(tileValue, meld.tiles.length);
        }
    }
    return melds;
}

function getHonorMeldIfPossible(quantity: number, tileGroup: HonorTileGroup, tileValue: HonorTileValue) : Meld | undefined {
    if (quantity < 2 && quantity >= 0) {
        // quantity === 0 is a no-op. 
        // quantity === 1 means the hand does not have a winning hand probably. Not a fatal error, just continue.
        return undefined; 
    /** default to not exposed for every created meld. */
    } else if (quantity === 2) {
        return new Pair(constructHonorTile(tileGroup, tileValue));
    } else if (quantity === 3) {
        return new Pong(constructHonorTile(tileGroup, tileValue));
    } else if (quantity === 4) {
        return new Kong(constructHonorTile(tileGroup, tileValue));
    } else {
        throw new Error(`Hand is malformed. Found quantity not between 0 and 4 for ${tileGroup} ${tileValue}: ${quantity}`);
    }
}