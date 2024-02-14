import DragonTile from "model/tile/group/dragonTile";
import WindTile from "model/tile/group/windTile";
import { Tile } from "model/tile/tile";
import { TileGroup } from "model/tile/tileGroup";
import { DragonTileValue, isDragonTileValue, WindTileValue, isWindTileValue } from "model/tile/tileValue";

export type HonorTile = DragonTile | WindTile;
export type HonorTileValue = DragonTileValue | WindTileValue;
export type HonorTileGroup = TileGroup.DRAGON | TileGroup.WIND;
export const honorTileGroups: ReadonlySet<TileGroup> = new Set([TileGroup.DRAGON, TileGroup.WIND]);
export function isHonorTile(tile: Tile): tile is HonorTile {
    return (tile.group === TileGroup.DRAGON && isDragonTileValue(tile.value)) ||
        (tile.group === TileGroup.WIND && isWindTileValue(tile.value));
}