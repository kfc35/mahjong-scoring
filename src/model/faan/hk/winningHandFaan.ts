import { Faan } from "model/faan/faan";

const winningHandFaan = [
    Faan.CHICKEN,
    Faan.COMMON_WITHOUT_VALUELESS_PAIR, 
    Faan.COMMON_WITH_VALUELESS_PAIR, 
    Faan.ALL_IN_TRIPLETS, 
    Faan.SEVEN_PAIRS,
    Faan.MIXED_ONE_SUIT,
    Faan.ALL_ONE_SUIT,
    Faan.ALL_HONORS,
    Faan.SMALL_DRAGONS,
    Faan.GREAT_DRAGONS,
    Faan.SMALL_WINDS,
    Faan.GREAT_WINDS,
    Faan.THIRTEEN_ORPHANS,
    Faan.ALL_KONGS,
    Faan.SELF_TRIPLETS,
    Faan.ORPHANS,
    Faan.NINE_GATES,
] as const;

export type WinningHandFaan = typeof winningHandFaan[number];
export function isWinningHandFaan(faan : Faan) : faan is WinningHandFaan {
    const faanList : readonly Faan[] = winningHandFaan;
    return faanList.indexOf(faan) !== -1;
}