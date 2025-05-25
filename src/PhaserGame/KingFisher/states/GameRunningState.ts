import { Game } from "phaser";
import GameManager from "../Managers/GameManager";
import {AnyState, awaitUntil, State} from "../StateMachine";
import { GameCrashedState } from "./GameCrashedState";
import { GAME_CONFIG } from "../Utils/GameConstants";

//Game running state when Bet is added
export class GameRunningState extends State
{ 
    private gameStartTime: number | undefined = 0; 
    private growthRate: number = 0.05;
    public async run(): Promise<AnyState> {

        //Returns the Next State based on the Instructions
        console.log("Inside the State : " + this.constructor.name);
        this.gameStartTime = GameManager.getInstance().activeScene?.time.now;
        this.growthRate = GAME_CONFIG.MULTIPLIER_TICK;
        //Initiate the Game Multiplier Update here
        await awaitUntil(()=> GameManager.getInstance().shouldCrash());

        return new GameCrashedState();
    }

    public update(_time: number, _delta: number): void {
        super.update(_time,_delta);
        if(this.gameStartTime === undefined)
            return;

      const elapsedTime = (_time - this.gameStartTime) / 1000;// + 1.0;
      let mul = Math.pow(Math.E, this.growthRate * elapsedTime);
      console.log("elapsedTime 1 : = " + elapsedTime + " Mul : " + mul);
      GameManager.getInstance().elapsedTime = elapsedTime;
      GameManager.getInstance().multiplier = Math.pow(Math.E, this.growthRate * elapsedTime);
      
      // Update multiplier text
      GameManager.getInstance().activeScene?.onGameRunning();
      
      // Randomly check if game should crash
    //   if (this.shouldCrash()) {
    //     this.crash();
    //   }
    }
}