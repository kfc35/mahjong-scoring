import { type FlowerTile, type FlowerTileValue, isFlowerTile } from "model/tile/group/flowerTile";
import { type SuitedOrHonorTile, type SuitedOrHonorTileValue, isSuitedOrHonorTile } from "model/tile/group/suitedOrHonorTile";
import { DragonTileValue } from "model/tile/tileValue";
import { TileGroup } from "model/tile/tileGroup";
import { Tile } from "model/tile/tile";

export const hongKongTileGroups : ReadonlySet<TileGroup> = new Set([TileGroup.GENTLEMAN, TileGroup.SEASON, 
    TileGroup.DRAGON, TileGroup.WIND, TileGroup.BAMBOO, TileGroup.CHARACTER, TileGroup.CIRCLE]);
export type HongKongTile = FlowerTile | SuitedOrHonorTile;
export type HongKongTileValue = FlowerTileValue | SuitedOrHonorTileValue;
export function isHongKongTile(tile: Tile): tile is HongKongTile {
    return isFlowerTile(tile) || isSuitedOrHonorTile(tile);
}

// TODO move this
/* For certain winning hands (e.g. in HK scoring), a dragon is associated with a suit.*/
export const dragonTileToTileGroup : ReadonlyMap<DragonTileValue, TileGroup> = new Map<DragonTileValue, TileGroup>([
    [DragonTileValue.GREEN, TileGroup.BAMBOO],
    [DragonTileValue.RED, TileGroup.CHARACTER],
    [DragonTileValue.WHITE, TileGroup.CIRCLE],
])