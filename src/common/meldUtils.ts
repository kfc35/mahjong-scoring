import Meld from "model/meld/meld";
import { Tile } from "model/tile/tile";
import { MeldType } from "model/meld/meldType";
import { SuitedOrHonorTile } from "model/tile/group/suitedOrHonorTile";

export function meldsNotNullAndCorrectLength(melds: Meld[], length: number): boolean {
    return (melds && melds.every(meld => !!meld) && melds.length === length);
}

export function meldsHasOnePair(melds: Meld[]): boolean {
    const pairs = melds.filter(meld => meld.type === MeldType.PAIR);
    return pairs.length === 1;
}

export function meldsNumKongs(melds: Meld[]): number {
    const kongs = melds.filter(meld => meld.type === MeldType.KONG);
    return kongs.length;
}

export function meldsNumTiles(melds: Meld[]) : number {
    return melds.map(meld => meld.tiles.length).reduce<number>((sum, len) => sum + len, 0);
}

export function toTiles(melds: Meld[]) : SuitedOrHonorTile[] {
    return melds.map(meld => meld.tiles)
        .reduce<SuitedOrHonorTile[]>((accum, tiles) => accum.concat(tiles), []);
}

export function meldHasTile(meld: Meld, tile: Tile) : boolean {
    for (const meldTile of meld.tiles) {
        if (meldTile.equals(tile)) {
            return true;
        }
    }
    return false;
}

export function meldsAreSubset(melds: Meld[], potentialSubset: Meld[], ignoreExposed? : boolean) {
    return potentialSubset.every(meld => meldExistsInMelds(melds, meld, ignoreExposed));
}

export function meldExistsInMelds(melds: Meld[], meldToCheck: Meld, ignoreExposed?: boolean) {
    for (const meld of melds) {
        if (meld.equals(meldToCheck, ignoreExposed)) {
            return true;
        }
    }
    return false;
}

export function overwriteExposedFlag(meldsToOverwrite: Meld[], meldsWithDesiredExposedFlag: Meld[]) {
    return meldsToOverwrite.map(meldToOverwrite => {
        for (const meld of meldsWithDesiredExposedFlag) {
            if (meldToOverwrite.equals(meld, false)) {
                return meld.clone();
            }
        }
        return meldToOverwrite.clone();
    });
}

export function cartesianProduct(meldsOne: Meld[][], meldsTwo: Meld[][]) : Meld[][] {
    if (meldsOne.length === 0) {
        return meldsTwo; // might also have length = 0, that is fine.
    }
    if (meldsTwo.length === 0) {
        return meldsOne;
    }
    const product : Meld[][] = [];
    for (const meldOne of meldsOne) {
        for (const meldTwo of meldsTwo) {
            product.push([...meldOne, ...meldTwo]);
        }
    }
    return product;
}