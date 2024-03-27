import { type SuitedOrHonorTile } from "model/tile/group/suitedOrHonorTile";
import { type FlowerTile } from "model/tile/group/flowerTile";
import Meld from "model/meld/meld";
import { WinningHand } from "model/hand/hk/winningHand";
import { handMinLengthWithoutFlowers } from "model/hand/hk/handConstants";
import { assertTilesNotNullAndCorrectLength, assertTilesSuitedOrHonor, assertEachTileHasQuantityLessThanMaxPerTile, assertTilesFlower, tilesUnique } from "common/tileUtils";

/** A SpecialWinningHand is a combination of tiles that does not fit the "meld" structure,
 * but still constitutes a win. E.g. Thirteen Orphans (13 arbitrary tiles plus a duplicate tile.)
 */
export class SpecialWinningHand implements WinningHand {
    private _tiles: SuitedOrHonorTile[]; // contains tiles from the pair.
    private _winningTile: SuitedOrHonorTile;
    protected _flowerTiles: FlowerTile[];

    // dups are allowed in tiles
    constructor(tiles: SuitedOrHonorTile[], winningTile: SuitedOrHonorTile, flowerTiles: FlowerTile[]) {
        assertTilesNotNullAndCorrectLength(tiles, handMinLengthWithoutFlowers, handMinLengthWithoutFlowers);
        assertTilesSuitedOrHonor(tiles);
        assertEachTileHasQuantityLessThanMaxPerTile(tiles);
        // TODO assert max 4 of each suited or honor tile?
        
        this._tiles = tiles;
        this._winningTile = winningTile;
        assertTilesFlower(flowerTiles);
        if (!tilesUnique(flowerTiles)) {
            throw new Error("flowerTiles must be unique");
        }
        this._flowerTiles = flowerTiles;
    }

    getContents(): SuitedOrHonorTile[] {
        return this._tiles;
    }

    get meldWithWinningTile() : Meld | undefined {
        return undefined;
    }

    get winningTile() : SuitedOrHonorTile {
        return this._winningTile;
    }

    get flowerTiles() : FlowerTile[] {
        return this._flowerTiles;
    }

}