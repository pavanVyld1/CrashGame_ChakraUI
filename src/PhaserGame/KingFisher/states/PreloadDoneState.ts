import {AnyState, State} from "../StateMachine";
import { IntroState } from "./IntroState";

//Preload is triggered if for loading the Assets is Finished
export class PreloadDoneState extends State
{
    public async run(): Promise<AnyState> {

        //Returns the Next State based on the Instructions
        console.log("Inside the State : " + this.constructor.name);
        return new IntroState();
    }
}