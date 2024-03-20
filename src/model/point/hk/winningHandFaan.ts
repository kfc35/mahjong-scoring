import { PointCriterion } from "model/point/pointCriterion";

const winningHandFaan = [
    PointCriterion.CHICKEN,
    PointCriterion.COMMON_WITHOUT_VALUELESS_PAIR, 
    PointCriterion.COMMON_WITH_VALUELESS_PAIR, 
    PointCriterion.ALL_IN_TRIPLETS, 
    PointCriterion.SEVEN_PAIRS,
    PointCriterion.MIXED_ONE_SUIT,
    PointCriterion.ALL_ONE_SUIT,
    PointCriterion.ALL_HONORS,
    PointCriterion.SMALL_DRAGONS,
    PointCriterion.GREAT_DRAGONS,
    PointCriterion.SMALL_WINDS,
    PointCriterion.GREAT_WINDS,
    PointCriterion.THIRTEEN_ORPHANS,
    PointCriterion.ALL_KONGS,
    PointCriterion.SELF_TRIPLETS,
    PointCriterion.ORPHANS,
    PointCriterion.NINE_GATES,
    PointCriterion.CONCEALED_HAND,
] as const;

export type WinningHandFaan = typeof winningHandFaan[number];
export function isWinningHandFaan(pointCriterion : PointCriterion) : pointCriterion is WinningHandFaan {
    const faanList : readonly PointCriterion[] = winningHandFaan;
    return faanList.indexOf(pointCriterion) !== -1;
}