import { Faan } from "model/faan/faan";

const winConditionFaan = [
    Faan.SELF_DRAW,
    Faan.WIN_FROM_WALL, //AKA Concealed Hand
    Faan.ROBBING_KONG,
    Faan.WIN_BY_LAST_TILE, // win by last tile on wall
    Faan.WIN_BY_LAST_DISCARD, // win by last discard of game
    Faan.WIN_BY_KONG, // win via replacement tile
    Faan.WIN_BY_DOUBLE_KONG, // win via replacement tile of replacement tile
    Faan.HEAVENLY_HAND, // east's initial hand is a winning hand
    Faan.EARTHLY_HAND, // non east player wins on east's first discard
] as const;

export type WinConditonFaan = typeof winConditionFaan[number];
export function isWinConditonFaanFaan(faan : Faan) : faan is WinConditonFaan {
    const faanList : readonly Faan[] = winConditionFaan;
    return faanList.indexOf(faan) !== -1;
}