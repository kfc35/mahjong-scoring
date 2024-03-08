import { WindTileValue } from "model/tile/tileValue";

export enum SeatWind {
    EAST = 'EAST', // Player one
    SOUTH = 'SOUTH', // two
    WEST = 'WEST', // three
    NORTH = 'NORTH' // four
}

export function seatWindToWindTileValue(seatWind: SeatWind) : WindTileValue {
    switch (seatWind) {
        case SeatWind.EAST:
            return WindTileValue.EAST;
        case SeatWind.SOUTH:
            return WindTileValue.SOUTH;
        case SeatWind.WEST:
            return WindTileValue.WEST;
        case SeatWind.NORTH:
            return WindTileValue.NORTH;
    }
}