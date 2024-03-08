import { PrevailingWind, prevailingWindToWindTileValue } from "model/roundContext/prevailingWind";
import { SeatWind, seatWindToWindTileValue } from "model/roundContext/seatWind";
import { WindTileValue } from "model/tile/tileValue";

export class RoundContext {
    private _prevailingWind : PrevailingWind;
    private _seatWind : SeatWind;

    constructor(prevailingWind: PrevailingWind, seatWind: SeatWind) {
        this._prevailingWind = prevailingWind;
        this._seatWind = seatWind;
    }

    get prevailingWind(): PrevailingWind {
        return this._prevailingWind;
    }

    getPrevailingWindAsWindTileValue(): WindTileValue {
        return prevailingWindToWindTileValue(this._prevailingWind);
    }

    get seatWind(): SeatWind {
        return this._seatWind;
    }

    getSeatWindAsWindTileValue(): WindTileValue {
        return seatWindToWindTileValue(this._seatWind);
    }
}