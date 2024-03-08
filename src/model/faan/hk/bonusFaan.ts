import { Faan } from "model/faan/faan";

const bonusFaan = [
    Faan.SEAT_GENTLEMAN,
    Faan.SEAT_SEASON,
    Faan.ANY_GENTLEMAN_OR_SEASON,
    Faan.PREVAILING_GENTLEMAN,
    Faan.PREVAILING_SEASON,
    Faan.ALL_GENTLEMEN,
    Faan.ALL_SEASONS,
    Faan.ALL_GENTLEMAN_AND_SEASONS,
    Faan.NO_GENTLEMEN_OR_SEASONS,
] as const;

export type BonusFaan = typeof bonusFaan[number];
export function isBonusFaan(faan : Faan) : faan is BonusFaan {
    const faanList : readonly Faan[] = bonusFaan;
    return faanList.indexOf(faan) !== -1;
}