import {AnyState, State} from "../StateMachine";
import { ReadyState } from "./ReadyState";

//Intro is triggered if its first time load
export class IntroState extends State
{
    public async run(): Promise<AnyState> {

        //Returns the Next State based on the Instructions
        
        return new ReadyState();
    }
}