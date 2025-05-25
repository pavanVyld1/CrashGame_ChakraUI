import GameManager from "../Managers/GameManager";
import {AnyState, State} from "../StateMachine";
import { WaitingForBetState } from "./WaitingForBetState";

export class ReadyState extends State
{
    //Ready state for the Game to Start
    public async run(): Promise<AnyState> {

        //Returns the Next State based on the Instructions
        console.log("Inside the State : " + this.constructor.name);
       
        await new Promise(resolve => setTimeout(resolve, 3000));
       
        GameManager.getInstance().resetGameValues();

        return new WaitingForBetState();
    }
}