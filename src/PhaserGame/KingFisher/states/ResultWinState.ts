import {AnyState, State} from "../StateMachine";
import { SettleBetState } from "./SettleBetState";

//Result win state to Trigger win scenarios
export class ResultWinState extends State
{
    public async run(): Promise<AnyState> {

        //Returns the Next State based on the Instructions
        console.log("Inside the State : " + this.constructor.name);
        return new SettleBetState();
    }
}