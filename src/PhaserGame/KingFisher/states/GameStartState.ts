import GameManager from "../Managers/GameManager";
import {AnyState, State} from "../StateMachine";
import { GAME_CONFIG } from "../Utils/GameConstants";
import GameUtils from "../Utils/GameUtils";
import { GameRunningState } from "./GameRunningState";

export class GameStartState extends State
{
    //Game Start state to init the Game start
    public async run(): Promise<AnyState> {

        let gameManager = GameManager.getInstance();
        //Returns the Next State based on the Instructions
        console.log("Inside the State : " + this.constructor.name);
        let crashPoint  = GameUtils.getRandomFloatBetween(GAME_CONFIG.MIN_MULTIPLIER,GAME_CONFIG.MAX_MULTIPLIER);
        console.log("Crash point : " + crashPoint);
        // gameManager.crashPoint = crashPoint;
        gameManager.crashPoint = GAME_CONFIG.MAX_MULTIPLIER - 1;

        gameManager.activeScene?.onGameStarting();
        return new GameRunningState();
    }
}