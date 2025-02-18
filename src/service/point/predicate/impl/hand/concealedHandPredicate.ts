import { MeldBasedWinningHand } from "model/hand/hk/winningHand/meldBasedWinningHand";
import { WinningHand } from "model/hand/hk/winningHand/winningHand";
import { PointPredicate, predicateAnd } from "service/point/predicate/pointPredicate";
import { createGenericPointPredicateRouter, createPointPredicateRouterWithAutoFailSpecialPredicate, createPointPredicateRouterWithAutoSucessSpecialPredicate as createPointPredicateRouterWithAutoSuccessSpecialPredicate } from "../util/pointPredicateUtil";
import { PointPredicateID } from "model/point/predicate/pointPredicateID";
import { RootPointPredicateConfiguration } from "service/point/predicate/configuration/root/rootPointPredicateConfiguration";
import { PointPredicateLogicOption } from "service/point/predicate/configuration/logic/pointPredicateLogicConfiguration";
import { createFilteredMeldsCheckerSuccessesQuantityPredicate } from "service/point/predicate/factory/meldBased/meldPredicateFactoryBase";
import { meldIsPair } from "model/meld/pair";
import { meldIsKong } from "model/meld/kong";
import { meldIsPong } from "model/meld/pong";
import WinContext from "model/winContext/winContext";
import { RoundContext } from "model/roundContext/roundContext";
import { SELF_DRAW_PREDICATE } from "service/point/predicate/impl/winCondition/winConditionPredicate";
import { ifLastTileWasDiscardThenItCompletedPairSubPredicate } from "service/point/predicate/impl/hand/lastTileSubPredicate";
import { onePairSubPredicate } from "service/point/predicate/impl/meld/pairSubPredicates";
import { SpecialWinningHand } from "model/hand/hk/winningHand/specialWinningHand";
import PointPredicateFailureResultTileDetail from "../../result/tile/pointPredicateFailureResultTileDetail";
import PointPredicateSuccessResultTileDetail from "../../result/tile/pointPredicateSuccessResultTileDetail";
import { createPPResultBasedOnBooleanFlagWithTileDetail } from "../util/pointPredicateUtil";

const atLeastFourConcealedPongsKongsSubPredicate : PointPredicate<MeldBasedWinningHand> = createFilteredMeldsCheckerSuccessesQuantityPredicate(PointPredicateID.SUBPREDICATE_AT_LEAST_FOUR_CONCEALED_PONGS_AND_KONGS, 
    meld => !meldIsPair(meld), melds => melds.length >= 4, meld => !meld.exposed && (meldIsKong(meld) || meldIsPong(meld)));
const atLeastFourConcealedPongsSubPredicate : PointPredicate<MeldBasedWinningHand> = createFilteredMeldsCheckerSuccessesQuantityPredicate(PointPredicateID.SUBPREDICATE_AT_LEAST_FOUR_CONCEALED_PONGS, 
    meld => !meldIsPair(meld), melds => melds.length >= 4, meld => !meld.exposed && meldIsPong(meld));
const atLeastFourConcealedNonPairMeldsSubPredicate : PointPredicate<MeldBasedWinningHand> = createFilteredMeldsCheckerSuccessesQuantityPredicate(PointPredicateID.SUBPREDICATE_AT_LEAST_FOUR_CONCEALED_NON_PAIR_MELDS, 
    meld => !meldIsPair(meld), melds => melds.length >= 4, meld => !meld.exposed);
export const atLeastFourConcealedMeldsSubPredicate : PointPredicate<MeldBasedWinningHand> = createFilteredMeldsCheckerSuccessesQuantityPredicate(PointPredicateID.SUBPREDICATE_AT_LEAST_FOUR_CONCEALED_MELDS, 
    (meld) => !meld.exposed, (melds) => melds.length >= 4, () => true);


const selfTripletsMeldBasedPredicate : PointPredicate<MeldBasedWinningHand> = 
    (meldBasedWinningHand: MeldBasedWinningHand, winCtx: WinContext, roundCtx: RoundContext, config: RootPointPredicateConfiguration) => {
        if (config.getLogicConfiguration().getOptionValue(PointPredicateLogicOption.SELF_TRIPLETS_ONLY_PONGS_ALLOWED)) {
            return predicateAnd(PointPredicateID.SELF_TRIPLETS,
                onePairSubPredicate,
                atLeastFourConcealedPongsSubPredicate)(meldBasedWinningHand, winCtx, roundCtx, config);
        } else {
            return predicateAnd(PointPredicateID.SELF_TRIPLETS,
                onePairSubPredicate,
                atLeastFourConcealedPongsKongsSubPredicate)(meldBasedWinningHand, winCtx, roundCtx, config);
        }
    };
export const SELF_TRIPLETS_PREDICATE : PointPredicate<WinningHand> = createPointPredicateRouterWithAutoFailSpecialPredicate(PointPredicateID.SELF_TRIPLETS, selfTripletsMeldBasedPredicate);

const concealedHandMeldBasedPredicate : PointPredicate<MeldBasedWinningHand> = 
    (meldBasedWinningHand: MeldBasedWinningHand, winCtx: WinContext, roundCtx: RoundContext, config: RootPointPredicateConfiguration) => {
        if (config.getLogicConfiguration().getOptionValue(PointPredicateLogicOption.CONCEALED_HAND_LAST_DISCARDED_TILE_MUST_COMPLETE_PAIR)) {
            return predicateAnd(PointPredicateID.CONCEALED_HAND,
                atLeastFourConcealedNonPairMeldsSubPredicate,
                onePairSubPredicate,
                ifLastTileWasDiscardThenItCompletedPairSubPredicate)(meldBasedWinningHand, winCtx, roundCtx, config);
        } else { // last discarded tile can complete any meld
            return predicateAnd(PointPredicateID.CONCEALED_HAND,
                // pair can count as one of the concealed melds
                atLeastFourConcealedMeldsSubPredicate,
                onePairSubPredicate)(meldBasedWinningHand, winCtx, roundCtx, config);
        }
    };
export const CONCEALED_HAND_PREDICATE : PointPredicate<WinningHand> = createPointPredicateRouterWithAutoSuccessSpecialPredicate(PointPredicateID.CONCEALED_HAND, concealedHandMeldBasedPredicate);

// four concealed non-pair melds, MUST win via self-draw
const fullyConcealedMeldBasedPredicate : PointPredicate<MeldBasedWinningHand> = 
    predicateAnd(PointPredicateID.FULLY_CONCEALED_HAND,
            atLeastFourConcealedNonPairMeldsSubPredicate, onePairSubPredicate, SELF_DRAW_PREDICATE);
// since special hands are concealed except for the last tile, only need to check for a self drawn last tile
const fullyConcealedSpecialHandPredicate : PointPredicate<SpecialWinningHand> = 
    (specialWinningHand: SpecialWinningHand) => {
        return createPPResultBasedOnBooleanFlagWithTileDetail(PointPredicateID.FULLY_CONCEALED_HAND, specialWinningHand.isSelfDrawn(), 
                    new PointPredicateSuccessResultTileDetail.Builder().tilesThatSatisfyPredicate([[specialWinningHand.winningTile]]).build(), 
                    new PointPredicateFailureResultTileDetail.Builder().tilesThatFailPredicate([[specialWinningHand.winningTile]]).build());
    }
export const FULLY_CONCEALED_PREDICATE : PointPredicate<WinningHand> = createGenericPointPredicateRouter(fullyConcealedMeldBasedPredicate, fullyConcealedSpecialHandPredicate);