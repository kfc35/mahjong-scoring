export enum Faan {
    // Hand level Faan
    CHICKEN = 'CHICKEN',
    COMMON_WITHOUT_VALUELESS_PAIR = 'COMMON_WITHOUT_VALUELESS_PAIR',
    COMMON_WITH_VALUELESS_PAIR = 'COMMON_WITH_VALUELESS_PAIR',
    ALL_IN_TRIPLETS = 'ALL_IN_TRIPLETS', // aka all pongs/kongs
    SEVEN_PAIRS = 'SEVEN_PAIRS',
    MIXED_ONE_SUIT = 'MIXED_ONE_SUIT', // honors + one suit
    ALL_ONE_SUIT = 'ALL_ONE_SUIT', // only one suit
    ALL_HONORS = 'ALL_HONORS', // only honors, ALL_IN_TRIPLETS not awarded
    SMALL_DRAGONS = 'SMALL_DRAGONS', // 2 pong dragons, pair of third
    GREAT_DRAGONS = 'GREAT_DRAGONS', // 3 pong dragons
    SMALL_WINDS = 'SMALL_WINDS', // 3 pong winds, pair of fourth
    GREAT_WINDS = 'GREAT_WINDS', // 4 pong winds
    THIRTEEN_ORPHANS = 'THIRTEEN_ORPHANS', //special win condition.
    ALL_KONGS = 'ALL_KONGS', // ALL_IN_TRIPLETS not awarded
    SELF_TRIPLETS = 'SELF_TRIPLETS', // four concealed pongs/kongs, not even the last one.
    // can win from self-pick for pair but no bonus for winning from wall
    ORPHANS = 'ORPHANS', // ALL_IN_TRIPLETS not counted.
    NINE_GATES = 'NINE_GATES', // must win totally concealed, can only eat when waiting.    
    MIXED_ORPHANS = 'MIXED_ORPHANS',

    // Meld level Faan
    SEAT_WIND_PONG = 'SEAT_WIND_PONG',
    PREVAILING_WIND_PONG = 'PREVAILING_WIND_PONG',
    DOUBLE_WIND_PONG = 'DOUBLE_WIND_PONG', // Seat & Prevailing
    RED_DRAGON_PONG = 'RED_DRAGON_PONG',
    GREEN_DRAGON_PONG = 'GREEN_DRAGON_PONG',
    WHITE_DRAGON_PONG = 'WHITE_DRAGON_PONG',

    // Win condition Faan
    SELF_DRAW = 'SELF_DRAW', // last winning tile is not a discard
    WIN_FROM_WALL = 'WIN_FROM_WALL', // AKA Concealed Hand - hand completely hidden or hidden except for winning tile.
    ROBBING_KONG = 'ROBBING_KONG',  // win overriding someone else's call for kong
    WIN_BY_LAST_TILE = 'WIN_BY_LAST_TILE', // win by last tile on wall
    WIN_BY_LAST_DISCARD = 'WIN_BY_LAST_DISCARD', // win by last discard of game
    WIN_BY_KONG = 'WIN_BY_KONG', // win via replacement tile from kong
    WIN_BY_FLOWER = "WIN_BY_FLOWER", // win via replacement tile from flower
    WIN_BY_DOUBLE_KONG = 'WIN_BY_DOUBLE_KONG', // win via replacement tile of replacement tile
    WIN_BY_DOUBLE_FLOWER = 'WIN_BY_DOUBLE_FLOWER', // win via replacement tile after drawing two flowers in a row
    HEAVENLY_HAND = 'HEAVENLY_HAND', // east's initial hand is a winning hand
    EARTHLY_HAND = 'EARTHLY_HAND', // non east player wins on east's first discard

    // Bonus tile Faan
    SEAT_GENTLEMAN = 'SEAT_GENTLEMAN',
    SEAT_SEASON = 'SEAT_SEASON',
    PREVAILING_GENTLEMAN = 'PREVAILING_GENTLEMAN',
    PREVAILING_SEASON = 'PREVAILING_SEASON',
    ANY_GENTLEMAN_OR_SEASON = 'ANY_GENTLEMAN_SEASON',
    ALL_GENTLEMEN = 'ALL_GENTLEMEN',
    ALL_SEASONS = 'ALL_SEASONS',
    ALL_GENTLEMAN_AND_SEASONS = 'ALL_GENTLEMEN_AND_SEASONS',
    NO_GENTLEMEN_OR_SEASONS = 'NO_GENTLEMEN_OR_SEASONS',
}