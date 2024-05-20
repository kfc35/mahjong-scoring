import { PointPredicate } from "service/point/predicate/pointPredicate";
import { StandardWinningHand } from "model/hand/hk/winningHand/standardWinningHand";
import { TileGroup } from "model/tile/tileGroup";
import { SpecialWinningHand } from "model/hand/hk/winningHand/specialWinningHand";
import SuitedTile, { isSuitedTile, isSuitedTileGroup, type SuitedTileGroup } from "model/tile/group/suitedTile";
import PointPredicateResult from "service/point/predicate/pointPredicateResult";
import { Tile } from "model/tile/tile";
import Chow, { meldIsChow } from "model/meld/chow";
import Meld from "model/meld/meld";
import { toTiles } from "common/meldUtils";
import { groupMeldsByTileGroupSatisfyingCondition } from "service/point/predicate/factory/tile/tilePredicateFactoryBase";

// voided suit (two suits)
// only one suit - specify the suit.
// all three suits
// specific suit.

export function createNumSuitedTileGroupsPredicate(pointPredicateID: string, desiredNumSuitedTileGroups: number) : PointPredicate<StandardWinningHand> {
    if (desiredNumSuitedTileGroups < 0 || desiredNumSuitedTileGroups > 3) {
        throw new Error("desiredNumSuitedTileGroups must be between 0 and 3.");
    }
    return (winningHand: StandardWinningHand) => {
        const melds = winningHand.getMelds();
        const suitedMeldIndices: number[] = melds.map((meld, index) => isSuitedTileGroup(meld.getTileGroupOfFirstTile()) ? index : -1)
            .filter(index => index !== -1);
        const indicesSetWrapper : Set<Set<number>> = new Set();
        indicesSetWrapper.add(new Set(suitedMeldIndices));

        const suitedTileGroupToNonKnittedMelds: ReadonlyMap<TileGroup, Meld[]> = groupMeldsByTileGroupSatisfyingCondition(melds, 
            meld => isSuitedTileGroup(meld.getTileGroupOfFirstTile()) && !(meldIsChow(meld) && meld.isKnitted()));

        const knittedChows : Chow[] = melds.filter(meld => meldIsChow(meld) && meld.isKnitted()).map(meld => meld as Chow);
        if (knittedChows.length > 0) { // knittedChows have all 3 suits.
            const suitedTileGroupToKnittedTile: ReadonlyMap<TileGroup, Tile[]> = separateKnittedChowsByTileGroup(knittedChows);
            const tiles: Tile[][] = [];
            for (const [stg, melds] of suitedTileGroupToNonKnittedMelds.entries()) {
                const knittedTilesWithSameSuit: Tile[] | undefined = suitedTileGroupToKnittedTile.get(stg);
                if (knittedTilesWithSameSuit) {
                    tiles.push([...toTiles(melds), ...knittedTilesWithSameSuit]);
                } else {
                    tiles.push(toTiles(melds));
                }
            }
            if (desiredNumSuitedTileGroups === 3) {
                return new PointPredicateResult(pointPredicateID, true, [tiles], [], indicesSetWrapper, []);
            }
            return new PointPredicateResult(pointPredicateID, false, [], tiles, new Set(), []);
        }

        const tiles: Tile[][] = [];
        for (const melds of suitedTileGroupToNonKnittedMelds.values()) {
            tiles.push(toTiles(melds));
        }
        if (suitedTileGroupToNonKnittedMelds.size !== desiredNumSuitedTileGroups) {
            return new PointPredicateResult(pointPredicateID, false, [], tiles, new Set(), []);
        }
        return new PointPredicateResult(pointPredicateID, true, [tiles], [], indicesSetWrapper, []);
    }
}

export function createNumSuitedTileGroupsPredicateSpecial(pointPredicateID: string, desiredNumSuitedTileGroups: number) : PointPredicate<SpecialWinningHand> {
    if (desiredNumSuitedTileGroups < 0 || desiredNumSuitedTileGroups > 3) {
        throw new Error("desiredNumSuitedTileGroups must be between 0 and 3.");
    }
    return (winningHand: SpecialWinningHand) => {
        const suitedTileGroupsToTiles = createSuitedTileGroupsToTilesMap(winningHand);
        const tiles : Tile[][] = [];
        for (const suitedTiles of suitedTileGroupsToTiles.values()) {
            tiles.push(suitedTiles);
        }
        if (suitedTileGroupsToTiles.size !== desiredNumSuitedTileGroups) {
            return new PointPredicateResult(pointPredicateID, false, [], tiles, new Set(), []);
        }
        return new PointPredicateResult(pointPredicateID, true, [tiles], [], new Set(), []);
    }
}

function separateKnittedChowsByTileGroup(knittedChows: Chow[]) : ReadonlyMap<TileGroup, Tile[]> {
    const tileGroupToTile: Map<TileGroup, Tile[]> = new Map();
    knittedChows.forEach(chow => {
        chow.tiles.forEach(tile => {
            if (!isSuitedTile(tile)) {
                return;
            }
            const tiles = tileGroupToTile.get(tile.group);
            if (tiles) {
                tiles.push(tile);
            } else {
                tileGroupToTile.set(tile.group, [tile]);
            }
        })
    });
    return tileGroupToTile;
}

function createSuitedTileGroupsToTilesMap(winningHand : SpecialWinningHand) : ReadonlyMap<SuitedTileGroup, SuitedTile[]> {
    const map = new Map<SuitedTileGroup, SuitedTile[]>();
    winningHand.getTiles().forEach(tiles => {
        tiles.forEach(tile => {
            if (isSuitedTile(tile)) {
                const tilesEntry = map.get(tile.group);
                if (tilesEntry) {
                    tilesEntry.push(tile);
                } else {
                    map.set(tile.group, [tile]);
                }
            }
        });
    });
    return map;
}