import { PointPredicateID } from "model/point/predicate/pointPredicateID";
import { MeldBasedWinningHand } from "model/hand/hk/winningHand/meldBasedWinningHand";
import { WinningHand } from "model/hand/hk/winningHand/winningHand";
import { PointPredicate } from "service/point/predicate/pointPredicate";
import WinContext from "model/winContext/winContext";
import { RoundContext } from "model/roundContext/roundContext";
import { createPongOrKongsExistPredicate } from "service/point/predicate/factory/meldBased/pongOrKongPredicateFactory";
import { WIND_TILES } from "common/deck";
import { RootPointPredicateConfiguration } from "service/point/predicate/configuration/root/rootPointPredicateConfiguration";
import { createPointPredicateRouterWithAutoFailSpecialPredicate } from "../util/pointPredicateUtil";

const seatWindPongKongMeldBasedPredicate : PointPredicate<MeldBasedWinningHand> = 
    (standardWinningHand: MeldBasedWinningHand, winContext: WinContext, roundContext: RoundContext, config: RootPointPredicateConfiguration) => {
        const seatWindPredicate = createPongOrKongsExistPredicate(PointPredicateID.SEAT_WIND_PONG_KONG, [roundContext.getSeatWindAsWindTile()]);
        return seatWindPredicate(standardWinningHand, winContext, roundContext, config);
    }

const prevailingWindPongKongMeldBasedPredicate : PointPredicate<MeldBasedWinningHand> = 
    (standardWinningHand: MeldBasedWinningHand, winContext: WinContext, roundContext: RoundContext, config: RootPointPredicateConfiguration) => {
        const prevailingWindPredicate = createPongOrKongsExistPredicate(PointPredicateID.PREVAILING_WIND_PONG_KONG, [roundContext.getPrevailingWindAsWindTile()]);
        return prevailingWindPredicate(standardWinningHand, winContext, roundContext, config);
    }

const bigFourWindsMeldBasedPredicate: PointPredicate<MeldBasedWinningHand> = 
    createPongOrKongsExistPredicate(PointPredicateID.BIG_FOUR_WINDS, WIND_TILES);

export const SEAT_WIND_PREDICATE : PointPredicate<WinningHand> = 
    createPointPredicateRouterWithAutoFailSpecialPredicate(PointPredicateID.SEAT_WIND_PONG_KONG, seatWindPongKongMeldBasedPredicate);
export const PREVAILING_WIND_PONG_KONG_PREDICATE : PointPredicate<WinningHand> = 
    createPointPredicateRouterWithAutoFailSpecialPredicate(PointPredicateID.PREVAILING_WIND_PONG_KONG, prevailingWindPongKongMeldBasedPredicate);
export const BIG_FOUR_WINDS_PREDICATE: PointPredicate<WinningHand> = 
    createPointPredicateRouterWithAutoFailSpecialPredicate(PointPredicateID.BIG_FOUR_WINDS, bigFourWindsMeldBasedPredicate);
