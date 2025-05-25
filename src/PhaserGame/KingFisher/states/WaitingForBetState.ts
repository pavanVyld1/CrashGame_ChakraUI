import GameManager from "../Managers/GameManager";
import BaseScene from "../scenes/BaseScene";
import {AnyState, State} from "../StateMachine";
import { GAME_CONFIG } from "../Utils/GameConstants";
import { GameStartState } from "./GameStartState";

export class WaitingForBetState extends State
{
    //will be waiting for the Next session 
    public async run(): Promise<AnyState> {
        if(GameManager.getInstance().activeScene != null && GameManager.getInstance().activeScene instanceof BaseScene){
            GameManager.getInstance().activeScene?.onWaitingForBet();
        }
        console.log("Inside the State : " + this.constructor.name);

        // Wait for 5 seconds
        await new Promise(resolve => setTimeout(resolve, GAME_CONFIG.MAX_BET_WAIT_TIME));
        // Return the next state after waiting
        return new GameStartState();
    }

    public update(_time: number, _delta: number): void {
        super.update(_time,_delta);
    }
}