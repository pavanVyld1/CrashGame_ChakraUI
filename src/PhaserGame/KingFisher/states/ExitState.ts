import {AnyState, State} from "../StateMachine";

//Exit state is to trigger the exit of the Game
export class ExitState extends State
{
    public async run(): Promise<AnyState> {

        //Returns the Next State based on the Instructions
        console.log("Inside the State : " + this.constructor.name);
        throw new Error("Method not implemented.");

    }
}