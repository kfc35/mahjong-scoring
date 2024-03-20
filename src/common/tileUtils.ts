import { type FlowerTile, isFlowerTile } from "model/tile/group/flowerTile";
import { type SuitedOrHonorTile, isSuitedOrHonorTile } from "model/tile/group/suitedOrHonorTile";
import SuitedTile, { isSuitedTile } from "model/tile/group/suitedTile";
import { type HongKongTile, isHongKongTile } from "model/tile/hk/hongKongTile";
import { Tile } from "model/tile/tile.js";

export function assertTilesNotNullAndCorrectLength(tiles: Tile[], minLength: number, maxLength: number) {
    if (!tiles || !tiles.every(tile => !!tile)) {
        throw new Error("tiles and its items cannot be null or undefined.");
    }
    if (tiles.length < minLength || tiles.length > maxLength) {
        throw new Error("tiles must have length between " + minLength + " and " + maxLength);
    }
}

export function assertTilesHaveSameSuitedGroup(tiles: Tile[]): tiles is SuitedTile[] {
    const firstTile = tiles[0];
    if (!firstTile) {
        throw new Error("tiles cannot be empty");
    }
    if (!tiles.every((tile) => isSuitedTile(tile) && !!tile && tile.group === firstTile.group)) {
        throw new Error("Each tile must be of the same SuitedTile TileGroup"); 
    }
    return true;
}

export function assertTilesSuitedOrHonor(tiles: Tile[]): tiles is SuitedOrHonorTile[] {
    if (!tiles.every(tile => isSuitedOrHonorTile(tile))) {
        throw new Error("Tiles must be of type SuitedOrHonorTile."); 
    }
    return true;
}

export function assertTileSuitedOrHonor(tile: Tile): tile is SuitedOrHonorTile {
    if (!isSuitedOrHonorTile(tile)) {
        throw new Error("Tile must be a SuitedOrHonorTile."); 
    }
    return true;
}

export function assertTilesFlower(tiles: Tile[]): tiles is FlowerTile[] {
    if (!tiles.every(tile => isFlowerTile(tile))) {
        throw new Error("Tiles must be of type FlowerTile."); 
    }
    return true;
}

export function assertTileFlower(tile: Tile): tile is FlowerTile {
    if (!isSuitedOrHonorTile(tile)) {
        throw new Error("Tile must be a FlowerTile."); 
    }
    return true;
}

export function assertTilesHongKongTile(tiles: Tile[]): tiles is HongKongTile[] {
    if (!tiles.every(tile => isHongKongTile(tile))) {
        throw new Error("Tiles must be of type HongKongTile."); 
    }
    return true;
}

export function tilesDoesNotContainTile(tiles: Tile[], tile: Tile): boolean {
    return tiles.every(tileInArray => !tileInArray.equals(tile));
}

export function tilesUnique(tiles: Tile[]): boolean {
    if (!tiles) {
        throw new Error("tiles cannot be null or undefined.");
    }
    const sortedTiles = [...tiles].sort();
    if (!sortedTiles.every(tile => !!tile)) {
        throw new Error("tiles' items cannot be null or undefined.");
    }
    if (sortedTiles.length < 2) {
        return true;
    }
    return sortedTiles.every((tile, index) => 
        index + 1 < sortedTiles.length ? !tile.equals(sortedTiles[index + 1]) : true);
}