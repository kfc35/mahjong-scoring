//import { WinCondition } from "model/hand/hk/winCondition";
import { FlowerTile } from "model/tile/group/flowerTile";
import { SuitedOrHonorTile } from "model/tile/group/suitedOrHonorTile";
import Meld from "model/meld/meld";

export interface WinningHand {
    //get winConditions() : WinCondition[];
    get flowerTiles() : FlowerTile[];
    getContents() : SuitedOrHonorTile[] | Meld[];
    get meldWithWinningTile() : Meld | undefined;
    get winningTile() : SuitedOrHonorTile;
}