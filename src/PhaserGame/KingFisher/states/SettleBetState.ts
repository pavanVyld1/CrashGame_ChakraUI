import GameManager from "../Managers/GameManager";
import {AnyState, State} from "../StateMachine";
import { ExitState } from "./ExitState";
import { ReadyState } from "./ReadyState";

//Set bet state, where the amount will be credited if its win, loss return
export class SettleBetState extends State
{
    public async run(): Promise<AnyState> {

        //Returns the Next State based on the Instructions
        console.log("Inside the State : " + this.constructor.name);
        GameManager.getInstance().updatePlayerbalance();
        return new ReadyState();
    }
}