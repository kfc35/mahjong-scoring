import { type SuitedOrHonorTile } from "model/tile/group/suitedOrHonorTile";
import { type FlowerTile } from "model/tile/group/flowerTile";
import Pair from "model/meld/pair";
import Meld from "model/meld/meld";
import { WinningHand } from "model/hand/hk/winningHand";
import { handMinLength } from "model/hand/hk/handConstants";
import { assertTilesNotNullAndCorrectLength, assertTilesSuitedOrHonor, assertTilesFlower, tilesUnique } from "common/tileUtils";
import { meldPairLength } from "model/meld/meldConstants";

/** A SpecialWinningHand is a combination of tiles that does not fit the "meld" structure,
 * but still constitutes a win. E.g. Thirteen Orphans (13 arbitrary tiles plus a duplicate tile.)
 * One can specify 14 different tiles, in which case the pair will be undefined.
 */
export class SpecialWinningHand implements WinningHand {
    private _tiles: SuitedOrHonorTile[];
    protected _flowerTiles: FlowerTile[];
    private _winningTile: SuitedOrHonorTile;
    private _pair?: Pair | undefined;

    // dups are allowed in tiles
    constructor(twelveOrFourteenTiles: SuitedOrHonorTile[], flowerTiles: FlowerTile[], winningTile: SuitedOrHonorTile, pair?: Pair) {
        if (pair) {
            assertTilesNotNullAndCorrectLength(twelveOrFourteenTiles, handMinLength - meldPairLength, handMinLength - meldPairLength);
        } else {
            assertTilesNotNullAndCorrectLength(twelveOrFourteenTiles, handMinLength, handMinLength);
        }
        assertTilesSuitedOrHonor(twelveOrFourteenTiles);
        // TODO assert max 4 of each suited or honor tile?
        this._tiles = twelveOrFourteenTiles;

        assertTilesFlower(flowerTiles);
        if (!tilesUnique(flowerTiles)) {
            throw new Error("flowerTiles must be unique");
        }
        this._flowerTiles = flowerTiles;
        this._winningTile = winningTile;
        this._pair = pair;
    }

    analyzeWinningHandForFaan(analyzer: (winningHand: WinningHand) => void) : this {
        analyzer(this);
        return this;
    }

    get flowerTiles() : FlowerTile[] {
        return this._flowerTiles;
    }

    getContents(): SuitedOrHonorTile[] {
        return ( this._pair ? [...this._tiles, ...this._pair.tiles] : [...this._tiles]); 
    }

    get meldWithWinningTile() : Meld | undefined {
        return undefined;
    }

    get winningTile() : SuitedOrHonorTile {
        return this._winningTile;
    }
}