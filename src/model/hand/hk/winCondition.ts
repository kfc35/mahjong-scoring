export enum WinCondition {
    SELF_DRAW = 'SELF_DRAW', // last winning tile is NOT a discard
    // "Win By Wall" aka "Concealed Hand" is calculated by looking at the melds.
    ROBBING_KONG = 'ROBBING_KONG',  // a special type of discard win - eating someones discard that would have been someone else's kong
    WIN_BY_LAST_TILE = 'WIN_BY_LAST_TILE', // win by last tile on wall
    WIN_BY_LAST_DISCARD = 'WIN_BY_LAST_DISCARD', // win by last discard of game
    WIN_BY_KONG = 'WIN_BY_KONG', // win via replacement tile from kong
    WIN_BY_FLOWER = 'WIN_BY_FLOWER', // win via replacement tile from flower
    WIN_BY_DOUBLE_KONG = 'WIN_BY_DOUBLE_KONG', // win via replacement tile of replacement tile
    WIN_BY_DOUBLE_FLOWER = 'WIN_BY_DOUBLE_FLOWER', // win via replacement tile after drawing two flowers in a row
    WIN_WITH_INITIAL_HAND = 'WIN_WITH_INITIAL_HAND' // can be HEAVENLY_HAND or EARTHLY_HAND depending on the RoundContext.
}