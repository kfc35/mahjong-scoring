import { type SuitedOrHonorTile } from "model/tile/group/suitedOrHonorTile";
import Meld  from "model/meld/meld.js";
import { MeldType } from "model/meld/meldType";
import { assertTileSuitedOrHonor } from "common/tileUtils";

export default class Pair extends Meld {
    private _tile: SuitedOrHonorTile;

    constructor(tile: SuitedOrHonorTile, exposed? : boolean) {
        assertTileSuitedOrHonor(tile);
        super([tile.copy(), tile.copy()], MeldType.PAIR, exposed);
        this._tile = tile;
    }

    clone(exposedOverride? : boolean) {
        return new Pair(this._tile, exposedOverride ?? this.exposed);
    }
}