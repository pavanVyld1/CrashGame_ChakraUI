import GameManager from "../Managers/GameManager";
import {AnyState, State} from "../StateMachine";
import { ResultLossState } from "./ResultLossState";
import { ResultWinState } from "./ResultWinState";

//Game result state once the Result is receied
export class GameCrashedState extends State
{
    public async run(): Promise<AnyState> {

        //Returns the Next State based on the Instructions
        console.log("Inside the State : " + this.constructor.name);
        GameManager.getInstance().crashed();
        GameManager.getInstance().activeScene?.onGameCrashed();
        
        if(GameManager.getInstance().isWin){
            return new ResultWinState();
        }else{
            return new ResultLossState();
        }
    }
}