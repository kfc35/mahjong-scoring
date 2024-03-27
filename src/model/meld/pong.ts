import { type SuitedOrHonorTile } from "model/tile/group/suitedOrHonorTile";
import Meld  from "model/meld/meld.js";
import { MeldType } from "model/meld/meldType";
import { assertTileSuitedOrHonor } from "common/tileUtils";

export default class Pong extends Meld {
    private _tile: SuitedOrHonorTile;

    constructor(tile: SuitedOrHonorTile, exposed?: boolean) {
        assertTileSuitedOrHonor(tile);
        super([tile.copy(), tile.copy(), tile.copy()], MeldType.PONG, exposed);
        this._tile = tile;
    }

    clone(exposedOverride? : boolean) {
        return new Pong(this._tile, exposedOverride ?? this.exposed);
    }
}

export function meldIsPong(meld: Meld): meld is Pong {
    return meld.type == MeldType.PONG;
}