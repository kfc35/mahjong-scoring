import { WinningHand } from "model/hand/hk/winningHand";
import Meld from "model/meld/meld";
import { type FlowerTile } from "model/tile/group/flowerTile";
import { assertTilesFlower, tilesDoesNotContainTile, tilesUnique } from "common/tileUtils";
import { meldExistsInMelds } from "common/meldUtils";
import { SuitedOrHonorTile } from "model/tile/group/suitedOrHonorTile";

/** A StandardWinningHand is a Hand that has been successfully analyzed to be a complete winning hand. i.e. processed into melds. 
 * A hand can have multipe standard winning hands depending on the arrangement of the melds.
 * Seven pairs counts as a standard winning hand.
*/
export class StandardWinningHand implements WinningHand {
    private melds: Meld[];
    private _meldWithWinningTile: Meld;
    private _winningTile: SuitedOrHonorTile;
    protected _flowerTiles: FlowerTile[];

    constructor(melds: Meld[], meldWithWinningTile: Meld, winningTile: SuitedOrHonorTile, flowerTiles: FlowerTile[], ) {
        this.melds = melds;
        // TODO any verification of melds? size 5 or 7? one pair if there is 5?

        assertTilesFlower(flowerTiles);
        if (!tilesUnique(flowerTiles)) {
            throw new Error("flowerTiles must be unique");
        }
        this._flowerTiles = flowerTiles;

        if (!meldExistsInMelds(melds, meldWithWinningTile, false)) {
            throw new Error("meldWithWinningTile must be one of melds");
        }
        this._meldWithWinningTile = meldWithWinningTile;
        if (tilesDoesNotContainTile(meldWithWinningTile.tiles, winningTile)) {
            throw new Error("winningTile must be in meldWithWinningTile");
        }
        this._winningTile = winningTile;
    }

    get flowerTiles() : FlowerTile[] {
        return this._flowerTiles;
    }

    getContents(): Meld[] {
        return this.melds;
    }

    get meldWithWinningTile() {
        return this._meldWithWinningTile;
    }

    get winningTile() {
        return this._winningTile;
    }

    // several candidate hand objects? you try to see if hand can be converted into a candidate hand object.
}

