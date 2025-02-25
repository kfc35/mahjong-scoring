# mjqt-scoring
Typescript Utilities to calculate a given hand's Mahjong score.

## For Consumers

### Install mjqt-scoring as a dependency

mjqt-scoring is available via npm. Run `npm install mjqt-scoring` in your project.

### Main Functionality

For consumers, the main function to calculate a hand's point value is within `scorer.ts`. `evaluateHand()` takes a `Hand` argument (a list of `Tile`s, the `mostRecentTileContext`, and an optional specification of pre-specified `Meld`s), a `WinContext` describing how the user won, the `RoundContext` describing the user's current seat and the prevailing wind, and a `RootPointPredicateConfiguration` that describes the current pointing rules (a default one is provided called `defaultRootPointPredicateConfiguration` that can be cloned and customized). It returns a `PointEvaluation`, which contains how many points the hand scored, a verbose result list describing which points the `Hand` successfully received, and a list of `PointPredicateID`s that were ignored when adding up the hand's points (due to already being included by an encompassing successful pointing rule). For more details on each of these types, refer to the Model section of this document.

## For Contributors

### Running Locally

After cloning the repo, run `npm install`. 
To compile, run `npm run build`.
To run tests, run `npm run test`.

## Model

### Tile

A `Tile` has two main attributes: a `group: TileGroup` and a `value: TileValue`. For example, the One of Bamboo has `group = TileGroup.BAMBOO` and `value = SuitedTileValue.ONE`.

### Meld

A `Meld` is a set of tiles that makes up a "meld" in the game of Mahjong, either a consecutive run (`Chow`), or a set of identical tiles: a pair (`Pair`), three of a kind (`Pong`), four of a kind (`Kong`).