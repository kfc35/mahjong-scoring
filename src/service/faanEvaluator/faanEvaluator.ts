import { WinningHand } from "model/hand/hk/winningHand.js";
import { FaanResult } from "service/faanEvaluator/faanResult";

export type faanEvaluator = (winningHand : WinningHand) => FaanResult;