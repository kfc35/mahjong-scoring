import { assertTilesHongKongTile, assertTilesNotNullAndCorrectLength, tilesUnique } from "common/tileUtils";
import { Tile } from "model/tile/tile";
import { type HongKongTile } from "model/tile/hk/hongKongTile";
import { type FlowerTile, isFlowerTile } from "model/tile/group/flowerTile";
import { type SuitedOrHonorTile, isSuitedOrHonorTile } from "model/tile/group/suitedOrHonorTile";
import { TileToQuantityMap } from "model/hand/hk/tileQuantityMap";
import { handMinLength, handMaxLength, handMaxNumUniqueFlowers } from "model/hand/hk/handConstants";
import { maxQuantityPerNonFlowerTile } from "common/deck";
import { TileGroup } from "model/tile/tileGroup";
import { type TileValue } from "model/tile/tileValue";
import Meld from "model/meld/meld";
import { toTiles } from "common/meldUtils";

/** A Hand is an unsorted collection of Mahjong Tiles.
 * It represents an instance when it is the player's turn.
 * It may or may not represent a winning hand based on what the tiles are. */
export class Hand {
    private _tileToQuantity: TileToQuantityMap;
    /* preSpecifiedMelds are melds that must be present in every derived winning hand.
       preSpecifiedMelds = [] means that there are no restrictions on any derived winning hands.
       e.g. if preSpeciedMelds has a concealed pong, every winning hand must have that concealed pong. 
       The tiles in each meld are also present in _tileToQuantity */ 
    private _preSpecifiedMelds: Meld[];
    private _flowerTiles: FlowerTile[];
    private _mostRecentTile: SuitedOrHonorTile;
    private _mostRecentTileIsSelfDrawn: boolean;

    constructor(tiles: HongKongTile[], mostRecentTile: SuitedOrHonorTile, 
        mostRecentTileIsSelfDrawn: boolean, preSpecifiedMelds?: Meld[]) {
        assertTilesNotNullAndCorrectLength(tiles, handMinLength, handMaxLength);
        assertTilesHongKongTile(tiles)

        this._flowerTiles = []; 
        for (const tile of tiles) {
            if (isFlowerTile(tile)) {
                this._flowerTiles.push(tile);
            }
        }
        if (!tilesUnique(this._flowerTiles)) {
            throw new TypeError("A HK Hand cannot have duplicate flower tiles.");
        }
        if (this._flowerTiles.length > handMaxNumUniqueFlowers) {
            throw new TypeError("A HK Hand can only have max " + handMaxNumUniqueFlowers + " number of flower tiles. Found " + this._flowerTiles.length);
        }
        
        const suitedOrHonorTiles : SuitedOrHonorTile[] = [];
        for (const tile of tiles) {
            if (isSuitedOrHonorTile(tile)) {
                suitedOrHonorTiles.push(tile);
            }
        }
        if (suitedOrHonorTiles.length < handMinLength) {
            throw new TypeError("A HK Hand must have at least " + handMinLength + " suited or honor tiles. Found " + suitedOrHonorTiles.length);
        }

        const tileToQuantity : TileToQuantityMap = new TileToQuantityMap(tiles);
        const quantityPerUniqueTile : number[] = tileToQuantity.getQuantityPerUniqueTile();
        const everyTileQuantityLessThanMaxUniqueTilePerHand = quantityPerUniqueTile.every(quantity => quantity < maxQuantityPerNonFlowerTile);
        if (!everyTileQuantityLessThanMaxUniqueTilePerHand) {
            throw new TypeError("A Hand can only have max " + maxQuantityPerNonFlowerTile + " of each unique suited or honor tile.");
        }

        if (preSpecifiedMelds && preSpecifiedMelds.length > 0) {
            const meldTiles = toTiles(preSpecifiedMelds);
            const meldTileToQuantity = new TileToQuantityMap(meldTiles);
            for (const tile of meldTiles) {
                if (meldTileToQuantity.getQuantity(tile) > tileToQuantity.getQuantity(tile)) {
                    throw new TypeError(`A Hand's pre-specified melds must be a subset of the provided tiles. ` + 
                        `For ${tile.value} ${tile.group}, there are ${meldTileToQuantity.getQuantity(tile)} of them in melds, but ` + 
                        `${tileToQuantity.getQuantity(tile)} in tiles.`);
                }
            }
        }
        if (tileToQuantity.getQuantity(mostRecentTile) === 0) {
            throw new TypeError("mostRecentTile must be present in the tiles array.");
        }

        this._tileToQuantity = tileToQuantity;
        this._mostRecentTile = mostRecentTile;
        this._mostRecentTileIsSelfDrawn = mostRecentTileIsSelfDrawn;
        this._preSpecifiedMelds = preSpecifiedMelds ?? [];
    }

    get tileToQuantity() {
        return this._tileToQuantity;
    }

    getQuantity(tile: Tile) : number;
    getQuantity(group: TileGroup, value: TileValue) : number;
    getQuantity(tileOrGroup: Tile | TileGroup, valueArg?: TileValue) : number {
        if (tileOrGroup instanceof Tile) {
            return this._tileToQuantity.getQuantity(tileOrGroup);
        } else if (!valueArg) {
            throw new Error("value cannot be null or undefined");
        } else {
            return this._tileToQuantity.getQuantity(tileOrGroup, valueArg);
        }
    }

    getQuantitiesForTileGroup(group: TileGroup): ReadonlyMap<TileValue, number> {
        return this._tileToQuantity.getQuantitiesForTileGroup(group);
    }

    getQuantityPerUniqueTile(includeFlowerTiles?: boolean): number[] {
        return this._tileToQuantity.getQuantityPerUniqueTile(includeFlowerTiles);
    }

    getTotalQuantity(includeFlowerTiles?: boolean) : number {
        return this._tileToQuantity.getTotalQuantity(includeFlowerTiles);
    }

    getQuantityToTileMap(includeFlowerTiles?: boolean) : ReadonlyMap<number, Tile[]> {
        return this._tileToQuantity.getQuantityToTileMap(includeFlowerTiles);
    }

    get flowerTiles() {
        return this._flowerTiles;
    }

    get mostRecentTile() {
        return this._mostRecentTile;
    }

    get mostRecentTileIsSelfDrawn() {
        return this._mostRecentTileIsSelfDrawn;
    }

    get preSpecifiedMelds() {
        return this._preSpecifiedMelds;
    }
}