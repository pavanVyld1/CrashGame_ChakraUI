import {AnyState, State} from "../StateMachine";
import { SettleBetState } from "./SettleBetState";

//Result Loss State 
export class ResultLossState extends State
{
    public async run(): Promise<AnyState> {

        //Returns the Next State based on the Instructions
        console.log("Inside the State : " + this.constructor.name);
        return new SettleBetState();
    }
}