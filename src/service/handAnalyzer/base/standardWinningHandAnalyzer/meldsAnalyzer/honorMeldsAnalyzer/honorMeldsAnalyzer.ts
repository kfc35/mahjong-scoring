import { MeldsAnalyzer } from "service/handAnalyzer/base/standardWinningHandAnalyzer/meldsAnalyzer/meldsAnalyzer";
import { Hand } from "model/hand/hk/hand";
import { type HonorTileGroup, HonorTileValue } from "model/tile/group/honorTile";
import { TileGroup } from "model/tile/tileGroup";
import { dragonTileValues, windTileValues } from "model/tile/tileValue";
import { constructHonorTile } from "model/tile/group/honorTileConstructor";
import Meld from "model/meld/meld";
import Pair from "model/meld/pair";
import Pong from "model/meld/pong";
import Kong from "model/meld/kong";

export const analyzeForHonorMelds : MeldsAnalyzer = (hand: Hand) => {
    const dragonMelds = getHonorMelds(hand, TileGroup.DRAGON, dragonTileValues);
    if (dragonMelds === undefined) {
        return [];
    }
    const windMelds = getHonorMelds(hand, TileGroup.WIND, windTileValues);
    if (windMelds === undefined) {
        return [];
    }
    const honorMelds: Meld[] = [];
    honorMelds.push(...dragonMelds);
    honorMelds.push(...windMelds);
    return [honorMelds];
}

function getHonorMelds(hand: Hand, tileGroup: HonorTileGroup, tileValues: HonorTileValue[]) : Meld[] {
    const melds : Meld[] = [];
    for (const tileValue of tileValues) {
        const quantity = hand.getQuantity(tileGroup, tileValue);
        const meld: Meld | undefined = getHonorMeldIfPossible(quantity, tileGroup, tileValue);
        if (meld) {
            melds.push(meld);
        }
    }
    return melds;
}

function getHonorMeldIfPossible(quantity: number, tileGroup: HonorTileGroup, tileValue: HonorTileValue) : Meld | undefined {
    if (quantity < 2 && quantity >= 0) {
        // quantity === 0 is a no-op. 
        // quantity === 1 means the hand does not have a winning hand probably. Not an error.
        return undefined; 
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