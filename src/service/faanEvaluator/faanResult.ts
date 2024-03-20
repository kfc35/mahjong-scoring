import { Faan } from "model/point/pointCriterion";
import { Tile } from "model/tile/tile";

export class FaanResult {
    private _faan: Faan;
    // The tiles that qualify for the faan if applicable. Nested array to accommodate sets of melds.
    private _tiles: Tile[][] 
    private _shouldCountTowardsMinimum: boolean;

    constructor(faan: Faan, tiles?: Tile[][], shouldCountTowardsMinimum?: boolean) {
        this._faan = faan;
        this._tiles = tiles ?? [];
        this._shouldCountTowardsMinimum = shouldCountTowardsMinimum ?? true;
    }

    get faan(): Faan {
        return this._faan;
    }

    get tiles(): Tile[][] {
        return this._tiles;
    }

    get shouldCountTowardsMinimum(): boolean {
        return this._shouldCountTowardsMinimum;
    }
}