import { WindTileValue } from "model/tile/tileValue";

export enum PrevailingWind {
    EAST = 'EAST',
    SOUTH = 'SOUTH',
    WEST = 'WEST',
    NORTH = 'NORTH'
}

export function prevailingWindToWindTileValue(prevailingWind: PrevailingWind) : WindTileValue {
    switch (prevailingWind) {
        case PrevailingWind.EAST:
            return WindTileValue.EAST;
        case PrevailingWind.SOUTH:
            return WindTileValue.SOUTH;
        case PrevailingWind.WEST:
            return WindTileValue.WEST;
        case PrevailingWind.NORTH:
            return WindTileValue.NORTH;
    }
}