import { PointCriterion } from "model/point/pointCriterion";

const meldFaan = [
    PointCriterion.SEAT_WIND_PONG,
    PointCriterion.PREVAILING_WIND_PONG,
    PointCriterion.RED_DRAGON_PONG,
    PointCriterion.GREEN_DRAGON_PONG,
    PointCriterion.WHITE_DRAGON_PONG,
] as const;

export type MeldFaan = typeof meldFaan[number];
export function isMeldFaan(pointCriterion : PointCriterion) : pointCriterion is MeldFaan {
    const faanList : readonly PointCriterion[] = meldFaan;
    return faanList.indexOf(pointCriterion) !== -1;
}