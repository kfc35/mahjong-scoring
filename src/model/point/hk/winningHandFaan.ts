import { PointCriterion } from "model/point/pointCriterion";

const winningHandFaan = [
    PointCriterion.CHICKEN,
    PointCriterion.ALL_CHOWS, 
    PointCriterion.VALUELESS_PAIR, 
    PointCriterion.ALL_IN_TRIPLETS, 
    PointCriterion.SEVEN_PAIRS,
    PointCriterion.MIXED_ONE_SUIT,
    PointCriterion.ALL_ONE_SUIT,
    PointCriterion.ALL_HONORS,
    PointCriterion.ALL_TERMINALS,
    // ALL_TERMINALS_AND_HONORS is not counted in HKOS official, but can be enabled if desired.
    PointCriterion.ALL_TERMINALS_AND_HONORS
    PointCriterion.SMALL_DRAGONS,
    PointCriterion.GREAT_DRAGONS,
    PointCriterion.SMALL_WINDS,
    PointCriterion.GREAT_WINDS,
    PointCriterion.THIRTEEN_ORPHANS,
    PointCriterion.ALL_KONGS,
    PointCriterion.SELF_TRIPLETS,
    PointCriterion.NINE_GATES,
    PointCriterion.CONCEALED_HAND,
    PointCriterion.MELDED_HAND,
    PointCriterion.FULLY_CONCEALED_HAND,
] as const;

export type WinningHandFaan = typeof winningHandFaan[number];
export function isWinningHandFaan(pointCriterion : PointCriterion) : pointCriterion is WinningHandFaan {
    const faanList : readonly PointCriterion[] = winningHandFaan;
    return faanList.indexOf(pointCriterion) !== -1;
}