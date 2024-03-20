import { PointCriterion } from "model/point/pointCriterion";

const bonusFaan = [
    PointCriterion.SEAT_GENTLEMAN,
    PointCriterion.SEAT_SEASON,
    PointCriterion.ANY_GENTLEMAN_OR_SEASON,
    PointCriterion.PREVAILING_GENTLEMAN,
    PointCriterion.PREVAILING_SEASON,
    PointCriterion.ALL_GENTLEMEN,
    PointCriterion.ALL_SEASONS,
    PointCriterion.ALL_GENTLEMAN_AND_SEASONS,
    PointCriterion.NO_GENTLEMEN_OR_SEASONS,
] as const;

export type BonusFaan = typeof bonusFaan[number];
export function isBonusFaan(pointCriterion : PointCriterion) : pointCriterion is BonusFaan {
    const faanList : readonly PointCriterion[] = bonusFaan;
    return faanList.indexOf(pointCriterion) !== -1;
}