import {AnyState, State} from "../StateMachine";
import { PreloadDoneState } from "./PreloadDoneState";

//Preload is triggered if for loading the Assets 
export class PreloadState extends State
{
    public async run(): Promise<AnyState> {

        //Returns the Next State based on the Instructions
        console.log("Inside the State : " + this.constructor.name);
        return new PreloadDoneState();
    }
}