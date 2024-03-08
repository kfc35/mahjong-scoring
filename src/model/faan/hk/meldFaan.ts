import { Faan } from "model/faan/faan";

const meldFaan = [
    Faan.SEAT_WIND_PONG,
    Faan.PREVAILING_WIND_PONG,
    Faan.DOUBLE_WIND_PONG
    Faan.RED_DRAGON_PONG,
    Faan.GREEN_DRAGON_PONG,
    Faan.WHITE_DRAGON_PONG,
] as const;

export type MeldFaan = typeof meldFaan[number];
export function isMeldFaan(faan : Faan) : faan is MeldFaan {
    const faanList : readonly Faan[] = meldFaan;
    return faanList.indexOf(faan) !== -1;
}