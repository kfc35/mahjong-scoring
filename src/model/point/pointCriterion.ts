export enum PointCriterion {
    // Hand Points
    CHICKEN = 'CHICKEN',
    ALL_CHOWS = 'ALL_CHOWS', // aka Common Hand
    VALUELESS_PAIR = 'VALUELESS_PAIR',
    ALL_IN_TRIPLETS = 'ALL_IN_TRIPLETS', // aka all pongs/kongs
    SEVEN_PAIRS = 'SEVEN_PAIRS',
    MIXED_ONE_SUIT = 'MIXED_ONE_SUIT', // honors + one suit
    ALL_ONE_SUIT = 'ALL_ONE_SUIT', // only one suit
    ALL_HONORS = 'ALL_HONORS', // only honors, ALL_IN_TRIPLETS not awarded
    ALL_TERMINALS = 'ALL_TERMINALS', // AKA Orphans, ALL_IN_TRIPLES not awarded
    ALL_TERMINALS_AND_HONORS = 'ALL_TERMINALS_AND_HONORS', // AKA Mixed Orphans.
    SMALL_DRAGONS = 'SMALL_DRAGONS', // 2 pong dragons, pair of third
    GREAT_DRAGONS = 'GREAT_DRAGONS', // 3 pong dragons
    SMALL_WINDS = 'SMALL_WINDS', // 3 pong winds, pair of fourth. sometimes has restrictions on fourth pair
    GREAT_WINDS = 'GREAT_WINDS', // 4 pong winds
    THIRTEEN_ORPHANS = 'THIRTEEN_ORPHANS', // special win condition.
    ALL_KONGS = 'ALL_KONGS', // ALL_IN_TRIPLETS not awarded
    SELF_TRIPLETS = 'SELF_TRIPLETS', // four concealed pongs/kongs, not even the last one.
    // can win from self-pick for pair only? no bonus for winning from wall
    NINE_GATES = 'NINE_GATES', // must win totally concealed, can only eat when waiting.    
    CONCEALED_HAND = 'CONCEALED_HAND', // the four non pair melds are concealed (except maybe the last one if won by discard), may or may not include SELF_DRAW last tile. can be customized.
    // the concealed hand may still count if the last self-drawn tile completes one of the four non pair melds depending on desired behavior (aka winning by discard on non pair meld is accepted)
    // default behavior: concealed hand counts if all four non pair melds are concealed and the last tile completes only the last non-pair meld, no restritions on self-draw.
    MELDED_HAND = 'MELDED_HAND', // the four non pair melds are revealed, may or may not include SELF_DRAW last tile for the pair. can be customized.
    // the melded hand may still count if the last tile completes the last non-pair meld via discard.
    // default behavior: melded hand counts if all four non pair melds are revealed and the last tile completes the pair via discard.
    // a FULLY_CONCEALED_HAND = CONCEALED_HAND + SELF_DRAWN. the self drawn tile applies to any of the melds
    // a FULLY_MELDED_HAND = MELDED_HAND and no SELF_DRAWN present. the last tile must complete the pair.
    MOON_FROM_THE_BOTTOM_OF_THE_SEA = 'MOON_FROM_THE_BOTTOM_OF_THE_SEA',
    PLUM_BLOSSOM_ON_THE_ROOF = 'PLUM_BLOSSOM_ON_THE_ROOF',

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