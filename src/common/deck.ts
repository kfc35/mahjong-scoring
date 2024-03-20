import GentlemanTile from "model/tile/group/gentlemanTile";
import SeasonTile from "model/tile/group/seasonTile";
import DragonTile from "model/tile/group/dragonTile";
import WindTile from "model/tile/group/windTile";
import BambooTile from "model/tile/group/bambooTile";
import CharacterTile from "model/tile/group/characterTile";
import CircleTile from "model/tile/group/circleTile";
import { GentlemanTileValue, SeasonTileValue, DragonTileValue, WindTileValue, SuitedTileValue } from "model/tile/tileValue";

export const maxQuantityPerNonFlowerTile = 4;
export const 
    PLUM_GENTLEMAN = new GentlemanTile(GentlemanTileValue.PLUM),
    ORCHID_GENTLEMAN = new GentlemanTile(GentlemanTileValue.ORCHID),
    BAMBOO_GENTLEMAN = new GentlemanTile(GentlemanTileValue.BAMBOO),
    CHRYSANTHEMUM_GENTLEMAN = new GentlemanTile(GentlemanTileValue.CHRYSANTHEMUM),
    
    SPRING_SEASON = new SeasonTile(SeasonTileValue.SPRING),
    SUMMER_SEASON = new SeasonTile(SeasonTileValue.SUMMER),
    AUTUMN_SEASON = new SeasonTile(SeasonTileValue.AUTUMN),
    WINTER_SEASON = new SeasonTile(SeasonTileValue.WINTER),

    GREEN_DRAGON = new DragonTile(DragonTileValue.GREEN),
    WHITE_DRAGON = new DragonTile(DragonTileValue.WHITE),
    RED_DRAGON = new DragonTile(DragonTileValue.RED),

    EAST_WIND = new WindTile(WindTileValue.EAST),
    SOUTH_WIND = new WindTile(WindTileValue.SOUTH),
    WEST_WIND = new WindTile(WindTileValue.WEST),
    NORTH_WIND = new WindTile(WindTileValue.NORTH),

    ONE_BAMBOO = new BambooTile(SuitedTileValue.ONE),
    TWO_BAMBOO = new BambooTile(SuitedTileValue.TWO),
    THREE_BAMBOO = new BambooTile(SuitedTileValue.THREE),
    FOUR_BAMBOO = new BambooTile(SuitedTileValue.FOUR),
    FIVE_BAMBOO = new BambooTile(SuitedTileValue.FIVE),
    SIX_BAMBOO = new BambooTile(SuitedTileValue.SIX),
    SEVEN_BAMBOO = new BambooTile(SuitedTileValue.SEVEN),
    EIGHT_BAMBOO  = new BambooTile(SuitedTileValue.EIGHT),
    NINE_BAMBOO = new BambooTile(SuitedTileValue.NINE),

    ONE_CIRCLE = new CircleTile(SuitedTileValue.ONE),
    TWO_CIRCLE = new CircleTile(SuitedTileValue.TWO),
    THREE_CIRCLE = new CircleTile(SuitedTileValue.THREE),
    FOUR_CIRCLE = new CircleTile(SuitedTileValue.FOUR),
    FIVE_CIRCLE = new CircleTile(SuitedTileValue.FIVE),
    SIX_CIRCLE = new CircleTile(SuitedTileValue.SIX),
    SEVEN_CIRCLE = new CircleTile(SuitedTileValue.SEVEN),
    EIGHT_CIRCLE  = new CircleTile(SuitedTileValue.EIGHT),
    NINE_CIRCLE = new CircleTile(SuitedTileValue.NINE),

    ONE_CHARACTER = new CharacterTile(SuitedTileValue.ONE),
    TWO_CHARACTER = new CharacterTile(SuitedTileValue.TWO),
    THREE_CHARACTER = new CharacterTile(SuitedTileValue.THREE),
    FOUR_CHARACTER = new CharacterTile(SuitedTileValue.FOUR),
    FIVE_CHARACTER = new CharacterTile(SuitedTileValue.FIVE),
    SIX_CHARACTER = new CharacterTile(SuitedTileValue.SIX),
    SEVEN_CHARACTER = new CharacterTile(SuitedTileValue.SEVEN),
    EIGHT_CHARACTER = new CharacterTile(SuitedTileValue.EIGHT),
    NINE_CHARACTER = new CharacterTile(SuitedTileValue.NINE);
    