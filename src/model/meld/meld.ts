import { SuitedOrHonorTile } from "model/tile/group/suitedOrHonorTile";
import { MeldType } from "model/meld/meldType";
import { assertTilesSuitedOrHonor } from "common/tileUtils";

export default abstract class Meld {
    protected _tiles: SuitedOrHonorTile[];
    protected _type: MeldType;
    /* _exposed = true if a discard was used to complete it during regular play.
      _exposed = false if the meld was completed without the need of a discard.
      If the last tile that completes your hand AND this meld is from a discard, 
      _exposed is set to true. */
    protected _exposed: boolean;

    constructor(tiles: SuitedOrHonorTile[], type: MeldType, exposed?: boolean) {
        assertTilesSuitedOrHonor(tiles);
        this._tiles = [...tiles].sort(function(tile1: SuitedOrHonorTile, tile2: SuitedOrHonorTile){
            return tile1.compareTo(tile2);
        });
        this._type = type;
        this._exposed = (exposed ? exposed : false);
    }

    get tiles(): SuitedOrHonorTile[] {
        return this._tiles;
    }

    get type(): MeldType {
        return this._type;
    }

    get exposed(): boolean {
        return this._exposed;
    }

    // ignoreExposed default is true
    equals(meld: Meld | undefined, ignoreExposed? : boolean): boolean {
        if (!meld) {
            return false;
        }
        if (this._tiles.length !== meld.tiles.length) {
            return false;
        }
        // TODO this assumption is not necessarily true... tiles is sorted in both meld objects.
        if (!this._tiles.every((tile, index) => tile.equals(meld.tiles[index]))) {
            return false;
        }
        return this._type === meld.type && ((ignoreExposed ?? true) || this._exposed === meld.exposed);
    }

    abstract clone(exposedOverride? : boolean): Meld;
}