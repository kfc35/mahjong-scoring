import { MeldsAnalyzer } from "service/handAnalyzer/base/standardWinningHandAnalyzer/meldsAnalyzer/meldsAnalyzer"
import { Hand } from "model/hand/hk/hand"
import { type SuitedTileGroup } from "model/tile/group/suitedTile";
import { constructSuitedTile } from "model/tile/group/suitedTileConstructor";
import Meld from "model/meld/meld";
import Pair from "model/meld/pair";
import Chow from "model/meld/chow";
import Pong from "model/meld/pong";
import Kong from "model/meld/kong";
import { meldPairLength, meldPongLength, meldKongLength } from "model/meld/meldConstants";
import { cartesianProduct } from "common/meldUtils";
import { TileGroup } from "model/tile/tileGroup";
import { SuitedTileValue, getNextSuitedTileValue } from "model/tile/tileValue";
import SuitedTileValueQuantityMemo from "service/handAnalyzer/base/standardWinningHandAnalyzer/meldsAnalyzer/suitedMeldsAnalyzer/suitedTileValueQuantityMemo";
import SuitedTile from "model/tile/group/suitedTile";

export const analyzeForNonKnittedSuitedMelds : MeldsAnalyzer = (hand: Hand) => {
    const bambooMelds = getSuitedMelds(hand, TileGroup.BAMBOO);
    const characterMelds = getSuitedMelds(hand, TileGroup.CHARACTER);
    const circleMelds = getSuitedMelds(hand, TileGroup.CIRCLE);

    return combineSuitedMelds(bambooMelds, characterMelds, circleMelds);
}

function getSuitedMelds(hand: Hand, tileGroup: SuitedTileGroup) : Meld[][] {
    const memo = new SuitedTileValueQuantityMemo(hand, tileGroup); 
    return getMeldsFromStartingSTV(tileGroup, SuitedTileValue.ONE, memo);
}

// Returns a list of possible meld combinations (hence Meld[][]).
// All melds have exposed = false by default.
function getMeldsFromStartingSTV(tileGroup: SuitedTileGroup, startingSTV: SuitedTileValue | undefined, quantityMemo: SuitedTileValueQuantityMemo) : Meld[][] {
    if (startingSTV === undefined) {
        return []; // finished processing for this tileGroup
    }
    const quantity = quantityMemo.getQuantity(startingSTV);
    if (quantity === 0) {
        return getMeldsFromStartingSTV(tileGroup, getNextSuitedTileValue(startingSTV), quantityMemo)
    }
    if (quantity === 1) {
        if (quantityMemo.hasEnoughQuantityForChows(startingSTV, 1)) {
            const chowCreator = chowsCreator(1);
            return createMeldsAndGetSubsequentMelds(tileGroup, startingSTV, quantityMemo, chowCreator);
        }
        return []; // one lone tile that cannot be used in a meld, so short circuit out. It'll be filtered elsewhere.
    }
    if (quantity === 2) {
        // can be a pair
        const melds = [];
        const pairCreator = toMeldsCreator(createPair);
        const pairAndSubsequentMelds = createMeldsAndGetSubsequentMelds(tileGroup, startingSTV, quantityMemo, pairCreator);
        melds.push(...pairAndSubsequentMelds);

        // can also be two chows if there is sufficient quantity
        if (quantityMemo.hasEnoughQuantityForChows(startingSTV, 2)) {
            const twoChowsCreator = chowsCreator(2);
            const twoChowsAndSubsequentMelds = createMeldsAndGetSubsequentMelds(tileGroup, startingSTV, quantityMemo, twoChowsCreator);
            melds.push(...twoChowsAndSubsequentMelds);
        }
        return melds;
    }
    if (quantity === 3) {
        // can be a pong.
        const melds = [];
        const pongCreator = toMeldsCreator(createPong);
        const pongAndSubsequentMelds = createMeldsAndGetSubsequentMelds(tileGroup, startingSTV, quantityMemo, pongCreator);
        melds.push(...pongAndSubsequentMelds);

        // can be one pair and one chow
        if (quantityMemo.hasEnoughQuantityForChows(startingSTV, 1)) {
            const onePairAndOneChowCreator = concatMeldCreators([createPair, createChow]);
            const onePairOneChowAndSubsequentMelds = createMeldsAndGetSubsequentMelds(tileGroup, startingSTV, quantityMemo, onePairAndOneChowCreator);
            melds.push(...onePairOneChowAndSubsequentMelds)
        }

        // can be three chows
        if (quantityMemo.hasEnoughQuantityForChows(startingSTV, 3)) {
            const threeChowsCreator = chowsCreator(3);
            const threeChowsAndSubsequentMelds = createMeldsAndGetSubsequentMelds(tileGroup, startingSTV, quantityMemo, threeChowsCreator);
            melds.push(...threeChowsAndSubsequentMelds);
        }

        return melds;
    }
    if (quantity === 4) {
        // can be a kong
        const melds = [];
        const kongCreator = toMeldsCreator(createKong);
        const kongAndSubsequentMelds = createMeldsAndGetSubsequentMelds(tileGroup, startingSTV, quantityMemo, kongCreator);
        melds.push(...kongAndSubsequentMelds);
        
        // can be one pong and one chow
        if (quantityMemo.hasEnoughQuantityForChows(startingSTV, 1)) {
            const onePongAndOneChowCreator = concatMeldCreators([createPong, createChow]);
            const onePongOneChowAndSubsequentMelds = createMeldsAndGetSubsequentMelds(tileGroup, startingSTV, quantityMemo, onePongAndOneChowCreator);
            melds.push(...onePongOneChowAndSubsequentMelds)
        }

        // can be one pair and two chows
        if (quantityMemo.hasEnoughQuantityForChows(startingSTV, 2)) {
            const onePairAndTwoChowsCreator = concatMeldsCreators([toMeldsCreator(createPair), chowsCreator(2)])
            const onePongOneChowAndSubsequentMelds = createMeldsAndGetSubsequentMelds(tileGroup, startingSTV, quantityMemo, onePairAndTwoChowsCreator);
            melds.push(...onePongOneChowAndSubsequentMelds)
        }
        
        // can be four chows
        if (quantityMemo.hasEnoughQuantityForChows(startingSTV, 4)) {
            const fourChowsCreator = chowsCreator(4);
            const fourChowsAndSubsequentMelds = createMeldsAndGetSubsequentMelds(tileGroup, startingSTV, quantityMemo, fourChowsCreator);
            melds.push(...fourChowsAndSubsequentMelds);
        }

        // cannot be two pairs -- checking for 7 pairs is a separate analyzer
        return melds;
    }
    throw new Error(`Hand is malformed. Found quantity not between 0 and 4 for ${tileGroup} ${startingSTV}: ${quantity}`);
}

function createMeldsAndGetSubsequentMelds(suitedTileGroup: SuitedTileGroup, suitedTileValue : SuitedTileValue, quantityMemo: SuitedTileValueQuantityMemo, meldsCreator: SuitedMeldsCreator) : Meld[][] {
    // the memo is copied in case the parent memo is re-used to process different meld possibilities
    const copiedMemo = new SuitedTileValueQuantityMemo(quantityMemo);
    const currentSTVMelds = meldsCreator(suitedTileGroup, suitedTileValue, copiedMemo);
    const subsequentMelds = getMeldsFromStartingSTV(suitedTileGroup, getNextSuitedTileValue(suitedTileValue), copiedMemo);
    return cartesianProduct([currentSTVMelds], subsequentMelds);
}

type SuitedMeldCreator = (suitedTileGroup: SuitedTileGroup, suitedTileValue : SuitedTileValue, quantityMemo: SuitedTileValueQuantityMemo) => Meld

const createPair : SuitedMeldCreator = (suitedTileGroup: SuitedTileGroup, suitedTileValue : SuitedTileValue, quantityMemo: SuitedTileValueQuantityMemo) => {
    quantityMemo.decreaseQuantity(suitedTileValue, meldPairLength);
    return new Pair(constructSuitedTile(suitedTileGroup, suitedTileValue));
}

const createChow : SuitedMeldCreator = (suitedTileGroup: SuitedTileGroup, suitedTileValue : SuitedTileValue, quantityMemo: SuitedTileValueQuantityMemo) => {
    const [[stv1, ],[stv2, ], [stv3, ]] = quantityMemo.decreaseQuantityForChow(suitedTileValue, 1);
    return new Chow([constructSuitedTile(suitedTileGroup, stv1),constructSuitedTile(suitedTileGroup, stv2), constructSuitedTile(suitedTileGroup, stv3)]);
}

const createPong : SuitedMeldCreator = (suitedTileGroup: SuitedTileGroup, suitedTileValue : SuitedTileValue, quantityMemo: SuitedTileValueQuantityMemo) => {
    quantityMemo.decreaseQuantity(suitedTileValue, meldPongLength);
    return new Pong(constructSuitedTile(suitedTileGroup, suitedTileValue));
}

const createKong : SuitedMeldCreator = (suitedTileGroup: SuitedTileGroup, suitedTileValue : SuitedTileValue, quantityMemo: SuitedTileValueQuantityMemo) => {
    quantityMemo.decreaseQuantity(suitedTileValue, meldKongLength);
    return new Kong(constructSuitedTile(suitedTileGroup, suitedTileValue));
}

type SuitedMeldsCreator = (suitedTileGroup: SuitedTileGroup, suitedTileValue : SuitedTileValue, quantityMemo: SuitedTileValueQuantityMemo) => Meld[]

function chowsCreator(numChows : number): SuitedMeldsCreator { 
    if (numChows < 0) {
        throw new Error("numChows cannot be negative.");
    }
    return (suitedTileGroup: SuitedTileGroup, suitedTileValue : SuitedTileValue, quantityMemo: SuitedTileValueQuantityMemo) => {
        const [[stv1, ],[stv2, ], [stv3, ]] = quantityMemo.decreaseQuantityForChow(suitedTileValue, numChows);
        const tiles : [SuitedTile, SuitedTile, SuitedTile] = [constructSuitedTile(suitedTileGroup, stv1),constructSuitedTile(suitedTileGroup, stv2), constructSuitedTile(suitedTileGroup, stv3)];
        const chows = [];
        for (let i = 1; i <= numChows; i++) {
            chows.push(new Chow(tiles));
        }
        return chows;
    }
}

function toMeldsCreator(suitedMeldCreator: SuitedMeldCreator) : SuitedMeldsCreator {
    return (suitedTileGroup: SuitedTileGroup, suitedTileValue : SuitedTileValue, quantityMemo: SuitedTileValueQuantityMemo) => {
        return [suitedMeldCreator(suitedTileGroup, suitedTileValue, quantityMemo)];
    };
}

function concatMeldCreators(suitedMeldCreators: SuitedMeldCreator[]) : SuitedMeldsCreator {
    return (suitedTileGroup: SuitedTileGroup, suitedTileValue : SuitedTileValue, quantityMemo: SuitedTileValueQuantityMemo) => {
        return suitedMeldCreators.map(suitedMeldCreator => suitedMeldCreator(suitedTileGroup, suitedTileValue, quantityMemo));
    };
}

function concatMeldsCreators(suitedMeldsCreators: SuitedMeldsCreator[]) : SuitedMeldsCreator {
    return (suitedTileGroup: SuitedTileGroup, suitedTileValue : SuitedTileValue, quantityMemo: SuitedTileValueQuantityMemo) => {
        const melds = [];
        for (const suitedMeldsCreator of suitedMeldsCreators) {
            melds.push(...suitedMeldsCreator(suitedTileGroup, suitedTileValue, quantityMemo));
        }
        return melds;
    }
}

function combineSuitedMelds(bambooMelds: Meld[][], characterMelds: Meld[][], circleMelds: Meld[][]) : Meld[][] {
    return cartesianProduct(cartesianProduct(bambooMelds, characterMelds), circleMelds);
}