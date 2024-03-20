import { PointCriterion } from "model/point/pointCriterion";

const winConditionFaan = [
    PointCriterion.SELF_DRAW,
    PointCriterion.ROBBING_KONG, 
    PointCriterion.WIN_BY_LAST_TILE, // win by last tile on wall
    PointCriterion.WIN_BY_LAST_DISCARD, // win by last discard of game
    PointCriterion.WIN_BY_KONG, // win via replacement tile
    PointCriterion.WIN_BY_DOUBLE_KONG, 
    PointCriterion.WIN_BY_FLOWER,
    PointCriterion.WIN_BY_DOUBLE_FLOWER,
    PointCriterion.HEAVENLY_HAND, // east's initial hand is a winning hand
    PointCriterion.EARTHLY_HAND, // non east player wins on east's first discard
] as const;

export type WinConditonFaan = typeof winConditionFaan[number];
export function isWinConditonFaan(pointCriterion : PointCriterion) : pointCriterion is WinConditonFaan {
    const faanList : readonly PointCriterion[] = winConditionFaan;
    return faanList.indexOf(pointCriterion) !== -1;
}