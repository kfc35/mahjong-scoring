import { Hand } from "model/hand/hk/hand";
import { type SuitedTileGroup } from "model/tile/group/suitedTile";
import { SuitedTileValue, suitedTileValues, getNextSuitedTileValue } from "model/tile/tileValue";

export default class SuitedTileValueQuantityMemo {
    private _memo: number[];

    constructor(hand: Hand, tileGroup: SuitedTileGroup);
    constructor(toBeCopied: SuitedTileValueQuantityMemo); 
    constructor(handOrToBeCopied: Hand | SuitedTileValueQuantityMemo, tileGroup?: SuitedTileGroup) {
        if (handOrToBeCopied instanceof Hand && tileGroup) {
            this._memo = [];
            const tileValueQuantityMap = handOrToBeCopied.getQuantitiesForTileGroup(tileGroup)
            for (const suitedTileValue of [...suitedTileValues].sort((stv1, stv2) => stv1.valueOf() - stv2.valueOf())) {
                // SuitedTileValue.ONE is at index 0, TWO is at index 1, etc.
                this._memo.push(tileValueQuantityMap.get(suitedTileValue) ?? 0);
            }
        } else if (handOrToBeCopied instanceof SuitedTileValueQuantityMemo) {
            this._memo = [...handOrToBeCopied.memo];
        }
        throw new Error('Invalid constructor arguments for SuitedTileValueQuantityMemo.');
    }

    getQuantity(stv: SuitedTileValue): number {
        const quantity = this._memo[stv.valueOf() - 1]
        if (!quantity) {
            throw new Error(`Memo has undefined value for SuitedTileValue ${stv}.`);
        }
        return quantity;
    }

    decreaseQuantity(stv: SuitedTileValue, amtToDecrease: number): number {
        if (amtToDecrease < 0) {
            throw new Error(`Cannot decrease a negative amount: ${amtToDecrease}`);
        }
        const quantity = this.getQuantity(stv);
        if (quantity < amtToDecrease) {
            throw new Error(`Cannot decrease quantity for ${stv}; its quantity (${quantity}) is less than ${amtToDecrease}.`);
        }
        this._memo[stv.valueOf() - 1] = quantity - amtToDecrease;
        return quantity - amtToDecrease;
    }

    decreaseQuantityForChow(startingSTV : SuitedTileValue, numChows: number) : [[SuitedTileValue, number], [SuitedTileValue, number], [SuitedTileValue, number]] {
        if (numChows < 0) {
            throw new Error(`Cannot create a negative amount of chows: ${numChows}`);
        }
        const nextSTV = getNextSuitedTileValue(startingSTV);
        if (nextSTV === undefined) {
            throw new Error(`startingSTV must have two suited tile values after it.`);
        }
        const twoAfterSTV = getNextSuitedTileValue(nextSTV);
        if (twoAfterSTV === undefined) {
            throw new Error(`startingSTV must have two suited tile values after it.`);
        }
        if (this.getQuantity(startingSTV) < numChows || this.getQuantity(nextSTV) < numChows || 
            this.getQuantity(twoAfterSTV) < numChows) {
                throw new Error(`Insufficient quantity of Suited Tile Values ${startingSTV} (${this.getQuantity(startingSTV)}), 
                ${nextSTV} (${this.getQuantity(nextSTV)}), and ${twoAfterSTV} (${this.getQuantity(twoAfterSTV)}).`);
        }

        return [[startingSTV, this.decreaseQuantity(startingSTV, numChows)], 
            [nextSTV, this.decreaseQuantity(nextSTV, numChows)],
            [twoAfterSTV, this.decreaseQuantity(twoAfterSTV, numChows)]];
    }

    // checks the quantity for this suitedTileValue and the next two for creating the desired number of chows.
    hasEnoughQuantityForChows(startingSTV : SuitedTileValue, numChows: number) : boolean {
        const nextSTV = getNextSuitedTileValue(startingSTV);
        if (nextSTV === undefined) {
            return false;
        }
        const twoAfterSTV = getNextSuitedTileValue(nextSTV);
        if (twoAfterSTV === undefined) {
            return false;
        }
        return this.getQuantity(startingSTV) >= numChows && 
            this.getQuantity(nextSTV) >= numChows &&
            this.getQuantity(twoAfterSTV) >= numChows;
    }

    private get memo(): number[] {
        return this._memo;
    }
}