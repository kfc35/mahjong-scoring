export enum PointCriterion {
    // Hand Points
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
    SMALL_WINDS = 'SMALL_WINDS', // 3 pong winds, pair of fourth. sometimes has restrictions on fourth pair
    GREAT_WINDS = 'GREAT_WINDS', // 4 pong winds
    THIRTEEN_ORPHANS = 'THIRTEEN_ORPHANS', // special win condition.
    ALL_KONGS = 'ALL_KONGS', // ALL_IN_TRIPLETS not awarded
    SELF_TRIPLETS = 'SELF_TRIPLETS', // four concealed pongs/kongs, not even the last one.
    // can win from self-pick for pair only? no bonus for winning from wall
    ORPHANS = 'ORPHANS', // ALL_IN_TRIPLETS not counted.
    NINE_GATES = 'NINE_GATES', // must win totally concealed, can only eat when waiting.    
    MIXED_ORPHANS = 'MIXED_ORPHANS', // TODO is this an actual hand?
    CONCEALED_HAND = 'CONCEALED_HAND', // at least four of the five melds are concealed, may or may not include SELF_DRAW last tile
    FULLY_CONCEALED_HAND = 'FULLY_CONCEALED_HAND', // all five melds are concealed, only SELF_DRAWN. takes precedence over CONCEALED_HAND.

    // Individual Meld Points
    SEAT_WIND_PONG = 'SEAT_WIND_PONG',
    PREVAILING_WIND_PONG = 'PREVAILING_WIND_PONG',
    DOUBLE_WIND_PONG = 'DOUBLE_WIND_PONG', // Seat & Prevailing
    RED_DRAGON_PONG = 'RED_DRAGON_PONG',
    GREEN_DRAGON_PONG = 'GREEN_DRAGON_PONG',
    WHITE_DRAGON_PONG = 'WHITE_DRAGON_PONG',

    // Win condition Points - Points awarded by how the winning tile was received
    SELF_DRAW = 'SELF_DRAW', // winning tile is NOT a discard
    // TODO do we need to be more specific about which meld the last tile completes in a hand?
    ROBBING_KONG = 'ROBBING_KONG',  // win by having priority over someone else's call to add that tile to a melded kong
    WIN_BY_LAST_TILE = 'WIN_BY_LAST_TILE', // win by last tile on wall
    WIN_BY_LAST_DISCARD = 'WIN_BY_LAST_DISCARD', // win by last discard of game
    WIN_BY_KONG = 'WIN_BY_KONG', // win via replacement tile from kong
    WIN_BY_FLOWER = 'WIN_BY_FLOWER', // win via replacement tile from flower
    WIN_BY_DOUBLE_KONG = 'WIN_BY_DOUBLE_KONG', // win via replacement tile of kong after replacement tile from kong
    WIN_BY_DOUBLE_FLOWER = 'WIN_BY_DOUBLE_FLOWER', // win via replacement tile after drawing two flowers in a row
    HEAVENLY_HAND = 'HEAVENLY_HAND', // east's initial hand is a winning hand (winning tile received on first draw)
    EARTHLY_HAND = 'EARTHLY_HAND', // non east player wins on east's first discard (winning tile was first discard)

    // Bonus tile Points
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