import { TileGroup } from "model/tile/tileGroup";
import { GentlemanTileValue, SeasonTileValue, DragonTileValue, WindTileValue, SuitedTileValue, type TileValue } from "model/tile/tileValue";
import { flowerTileGroups } from "model/tile/group/flowerTile";
import { Tile } from "model/tile/tile";
import { constructTile } from "model/tile/group/tileFactory";
import { tilesDoesNotContainTile } from "common/tileUtils";

// Wrapper class for mapping a tile to its quantity in a hand.
export class TileToQuantityMap {
    private _tileToQuantityMap: ReadonlyMap<TileGroup, ReadonlyMap<TileValue, number>>;

    constructor(tiles: Tile[]) {
        const tileToQuantityMap: Map<TileGroup, Map<TileValue, number>>= new Map();
        tileToQuantityMap.set(TileGroup.GENTLEMAN, new Map<GentlemanTileValue, number>());
        tileToQuantityMap.set(TileGroup.SEASON, new Map<SeasonTileValue, number>());
        tileToQuantityMap.set(TileGroup.DRAGON, new Map<DragonTileValue, number>());
        tileToQuantityMap.set(TileGroup.WIND, new Map<WindTileValue, number>());
        tileToQuantityMap.set(TileGroup.BAMBOO, new Map<SuitedTileValue, number>());
        tileToQuantityMap.set(TileGroup.CHARACTER, new Map<SuitedTileValue, number>());
        tileToQuantityMap.set(TileGroup.CIRCLE, new Map<SuitedTileValue, number>());
        tiles.forEach(tile => {
            const tileValToQuantityMap: Map<TileValue, number> | undefined = tileToQuantityMap.get(tile.group);
            if (!tileValToQuantityMap) {
                throw new Error("Unsupported tile group: " + tile.group);
            }
            const prevValue: number | undefined = tileValToQuantityMap.get(tile.value);
            if (prevValue) {
               tileValToQuantityMap.set(tile.value, prevValue + 1);
            } else {
               tileValToQuantityMap.set(tile.value, 1);
            }
        });
        this._tileToQuantityMap = tileToQuantityMap;
    }

    getQuantity(tile: Tile) : number;
    getQuantity(group: TileGroup, value: TileValue) : number;
    getQuantity(tileOrGroup: Tile | TileGroup, valueArg?: TileValue) : number {
        let group: TileGroup;
        let value: TileValue | undefined;
        if (tileOrGroup instanceof Tile) {
            group = tileOrGroup.group;
            value = tileOrGroup.value;
        } else if (!valueArg) {
            throw new Error("value cannot be null or undefined");
        } else {
            group = tileOrGroup
            value = valueArg;
        }
        const groupMap = this._tileToQuantityMap.get(group);
        if (!groupMap) {
            return 0;
        }
        return groupMap.get(value) ?? 0;
    }

    getQuantitiesForTileGroup(group: TileGroup) : ReadonlyMap<TileValue, number> {
        const quantities = this._tileToQuantityMap.get(group);
        if (!quantities) {
            throw new Error(`Unsupported tile group: ${group}`);
        }
        return quantities;
    }

    getQuantityPerUniqueTile(includeFlowerTiles?: boolean): number[] {
        return [...this._tileToQuantityMap.entries()]
            .filter(([tileGroup,]) => ((includeFlowerTiles ?? false) ? true : !flowerTileGroups.has(tileGroup)))
            .map(([, map]) => [...map.values()]) // number[][]
            .reduce<number[]>((accum, numberArray) => accum.concat(numberArray), []);
    }

    getTotalQuantity(includeFlowerTiles?: boolean) : number {
        return [...this._tileToQuantityMap.entries()]
        .filter(([tileGroup,]) => ((includeFlowerTiles ?? false) ? true : !flowerTileGroups.has(tileGroup)))
        .map(([, map]) => [...map.values()]) // number[][]
        .reduce<number[]>((accum, numberArray) => accum.concat(numberArray), [])
        .reduce<number>((sum, quantity) => sum + quantity, 0);
    }

    getQuantityToTileMap(includeFlowerTiles?: boolean) : ReadonlyMap<number, Tile[]> {
        const invertedMap = new Map<number, Tile[]>();
        for (const [tileGroup, innerMap] of this._tileToQuantityMap.entries()) {
            if (!(includeFlowerTiles ?? false) && flowerTileGroups.has(tileGroup)) {
                continue;
            }
            for (const [tileValue, quantity] of innerMap.entries()) {
                const tileArray = invertedMap.get(quantity);
                const tile = constructTile(tileGroup, tileValue);
                if (tileArray) {
                    if (tilesDoesNotContainTile(tileArray, tile)) {
                        tileArray.push(tile);
                    } // else no-op, array already containes tile.
                } else {
                    invertedMap.set(quantity, [tile]);
                }
            }
        }
        return invertedMap;
    }
}