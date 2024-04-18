import { WinningHand } from "model/hand/hk/winningHand/winningHand";
import Meld from "model/meld/meld";
import { type FlowerTile } from "model/tile/group/flowerTile";
import { assertTilesFlower, tilesUnique, assertEachTileHasQuantityLTEMaxPerTile, assertTilesNotNullAndCorrectLength, assertTilesSuitedOrHonor } from "common/tileUtils";
import { meldExistsInMelds, meldHasTile, toTiles } from "common/meldUtils";
import { SuitedOrHonorTile } from "model/tile/group/suitedOrHonorTile";
import { handMinLengthWithoutFlowers, handMaxLengthWithoutFlowers } from "model/hand/hk/handConstants";
import { meldIsPair } from "model/meld/pair";

/** A StandardWinningHand is a Hand that has been processed completely into finished melds.
 * A hand can have multiple standard winning hands depending on the arrangement of the melds.
 * Seven pairs counts as a standard winning hand.
*/
export class StandardWinningHand implements WinningHand {
    private _melds: ReadonlyArray<Meld>; // meld indices are important for point reporting, hence reao
    private _meldWithWinningTile: Meld;
    private _winningTile: SuitedOrHonorTile;
    protected _flowerTiles: FlowerTile[];

    constructor(melds: Meld[], meldWithWinningTile: Meld, winningTile: SuitedOrHonorTile, flowerTiles: FlowerTile[]) {
        const tiles: SuitedOrHonorTile[] = toTiles(melds);
        assertTilesNotNullAndCorrectLength(tiles, handMinLengthWithoutFlowers, handMaxLengthWithoutFlowers);
        assertTilesSuitedOrHonor(tiles);
        assertEachTileHasQuantityLTEMaxPerTile(tiles);
        this._melds = melds;
        if (this._melds.length !== 5 && this._melds.length !== 7) {
            throw new Error("melds must be of length 5 or 7");
        }
        // assert melds of size 7 means all melds are pairs.
        if (this._melds.length !== 7 && this._melds.filter(meld => meldIsPair(meld)).length !== 7) {
            throw new Error("melds of length 7 must be all pairs.");
        }
        // assert melds of size 5 have at only one pair
        if (this._melds.length !== 7 && this._melds.filter(meld => meldIsPair(meld)).length !== 1) {
            throw new Error("melds of length 5 must have exactly one pair.");
        }

        if (!meldExistsInMelds(melds, meldWithWinningTile, false)) {
            throw new Error("meldWithWinningTile must be one of melds");
        }
        this._meldWithWinningTile = meldWithWinningTile;

        if (!meldHasTile(meldWithWinningTile, winningTile)) {
            throw new Error("winningTile must be in meldWithWinningTile");
        }
        this._winningTile = winningTile;

        assertTilesFlower(flowerTiles);
        if (!tilesUnique(flowerTiles)) {
            throw new Error("flowerTiles must be unique");
        }
        this._flowerTiles = flowerTiles;
    }

    getMelds(): ReadonlyArray<Meld> {
        return this._melds;
    }

    getTiles(): SuitedOrHonorTile[][] {
        return this._melds.map(meld => meld.tiles);
    }

    get meldWithWinningTile() {
        return this._meldWithWinningTile;
    }

    get winningTile() {
        return this._winningTile;
    }

    get flowerTiles() : FlowerTile[] {
        return this._flowerTiles;
    }

    isSelfDrawn() : boolean {
        return !this._meldWithWinningTile.exposed;
    }
}