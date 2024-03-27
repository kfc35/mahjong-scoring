import { type SuitedOrHonorTile } from "model/tile/group/suitedOrHonorTile";
import Meld  from "model/meld/meld.js";
import { MeldType } from "model/meld/meldType";
import { assertTileSuitedOrHonor } from "common/tileUtils";

export default class Kong extends Meld {
    private _tile: SuitedOrHonorTile;

    constructor(tile: SuitedOrHonorTile, exposed?: boolean) {
        assertTileSuitedOrHonor(tile);
        super([tile.copy(), tile.copy(), tile.copy(), tile.copy()], MeldType.KONG, exposed);
        this._tile = tile.copy();
    }

    clone(exposedOverride? : boolean) {
        return new Kong(this._tile, exposedOverride ?? this.exposed);
    }
}

export function meldIsKong(meld: Meld): meld is Kong {
    return meld.type == MeldType.KONG;
}