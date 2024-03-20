import { getEnumKeys } from "common/enumUtils"

export enum GentlemanTileValue {
    PLUM = 'PLUM',
    ORCHID = 'ORCHID',
    BAMBOO = 'BAMBOO',
    CHRYSANTHEMUM = 'CHRYSANTHEMUM'
}

// Should automatically be sorted by declaration order.
export const gentlemanTileValues : GentlemanTileValue[] = 
    getEnumKeys(GentlemanTileValue).map(key => GentlemanTileValue[key]);

export function isGentlemanTileValue(tileValue: TileValue): tileValue is GentlemanTileValue {
    const acceptableTileValues: TileValue[] = gentlemanTileValues;
    return acceptableTileValues.indexOf(tileValue) !== -1;
}

export enum SeasonTileValue {
    SPRING = 'SPRING',
    SUMMER = 'SUMMER',
    AUTUMN = 'AUTUMN',
    WINTER = 'WINTER'
}

export const seasonTileValues : SeasonTileValue[] = 
    getEnumKeys(SeasonTileValue).map(key => SeasonTileValue[key]);

export function isSeasonTileValue(tileValue: TileValue): tileValue is SeasonTileValue {
    const acceptableTileValues: TileValue[] = seasonTileValues;
    return acceptableTileValues.indexOf(tileValue) !== -1;
}

export enum DragonTileValue {
    GREEN = 'GREEN',
    WHITE = 'WHITE',
    RED = 'RED'
}

export const dragonTileValues : DragonTileValue[] = 
    getEnumKeys(DragonTileValue).map(key => DragonTileValue[key]);

export function isDragonTileValue(tileValue: TileValue): tileValue is DragonTileValue {
    const acceptableTileValues: TileValue[] = dragonTileValues;
    return acceptableTileValues.indexOf(tileValue) !== -1;
}

export enum WindTileValue {
    EAST = 'EAST',
    SOUTH = 'SOUTH',
    WEST = 'WEST',
    NORTH = 'NORTH'
}

export const windTileValues : WindTileValue[] = 
    getEnumKeys(WindTileValue).map(key => WindTileValue[key]);

export function isWindTileValue(tileValue: TileValue): tileValue is WindTileValue {
    const acceptableTileValues: TileValue[] = windTileValues;
    return acceptableTileValues.indexOf(tileValue) !== -1;
}

export enum SuitedTileValue {
    ONE = 1, 
    TWO, 
    THREE, 
    FOUR, 
    FIVE, 
    SIX, 
    SEVEN, 
    EIGHT, 
    NINE
}

export const suitedTileValues : SuitedTileValue[] = 
    getEnumKeys(SuitedTileValue).map(key => SuitedTileValue[key])
    .sort((v1, v2) => v1.valueOf() - v2.valueOf()); // just in case, sort explicitly by value.

export function isSuitedTileValue(tileValue: TileValue): tileValue is SuitedTileValue {
    const acceptableTileValues: TileValue[] = suitedTileValues;
    return acceptableTileValues.indexOf(tileValue) !== -1;
}

export function getNextSuitedTileValue(suitedTileValue : SuitedTileValue) : SuitedTileValue | undefined {
    if (suitedTileValue < SuitedTileValue.NINE && suitedTileValue >= SuitedTileValue.ONE) {
        return suitedTileValue + 1;
    }
    if (suitedTileValue === SuitedTileValue.NINE) {
        return undefined;
    }
    throw new Error("Unhandled SuitedTileValue.");
}

export type TileValue = GentlemanTileValue | SeasonTileValue | DragonTileValue | WindTileValue | SuitedTileValue;