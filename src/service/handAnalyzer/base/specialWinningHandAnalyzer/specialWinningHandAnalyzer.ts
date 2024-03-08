import { Hand } from "model/hand/hk/hand";
import { HandAnalyzer } from "service/handAnalyzer/hk/handAnalyzer";
import { SpecialWinningHand } from "model/hand/hk/specialWinningHand";
import { thirteenOrphansAnalyzer } from "service/handAnalyzer/base/specialWinningHandAnalyzer/impl/thirteenOrphansAnalyzer";

export const analyzeForSpecialWinningHands : HandAnalyzer<SpecialWinningHand> = (hand: Hand) => {
    // special winning hand
    const thirteenOrphansHand = thirteenOrphansAnalyzer(hand);
    if (thirteenOrphansHand) {
        return thirteenOrphansHand;
    }
    
    return [];
}