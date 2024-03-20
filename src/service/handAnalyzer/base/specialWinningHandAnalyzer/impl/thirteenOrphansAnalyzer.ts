import { constructThirteenTilesWithOneDupAnalyzer } from "service/handAnalyzer/base/specialWinningHandAnalyzer/factory/thirteenTilesWithOneDupAnalyzer";
import { type HandAnalyzer } from "service/handAnalyzer/hk/handAnalyzer";
import { WHITE_DRAGON, EAST_WIND, GREEN_DRAGON, NINE_BAMBOO, NINE_CHARACTER, NINE_CIRCLE, NORTH_WIND, ONE_BAMBOO, ONE_CHARACTER, ONE_CIRCLE, SOUTH_WIND, WEST_WIND, RED_DRAGON } from "common/deck";
import { SuitedOrHonorTile } from "model/tile/group/suitedOrHonorTile";
import { SpecialWinningHand } from "model/hand/hk/specialWinningHand";

export const thirteenOrphanTiles: SuitedOrHonorTile[] = [
    ONE_BAMBOO, NINE_BAMBOO, ONE_CHARACTER, NINE_CHARACTER, ONE_CIRCLE, NINE_CIRCLE,
    GREEN_DRAGON, RED_DRAGON, WHITE_DRAGON, EAST_WIND, SOUTH_WIND, WEST_WIND, NORTH_WIND
];

export const thirteenOrphansAnalyzer : HandAnalyzer<SpecialWinningHand> = constructThirteenTilesWithOneDupAnalyzer(thirteenOrphanTiles);