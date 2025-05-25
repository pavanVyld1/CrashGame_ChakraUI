import Phaser from "phaser";
export type AnyState = State<any>;

type Data<T> = T extends undefined ? unknown : T;

type StateConstructor = {
    new (arg?: any): State<any>;
  };


export abstract class State<T = undefined> {
    public readonly data: Data<T>;
  
    constructor(...data: [T] extends [undefined] ? [] : [T]) {
      this.data = data[0] as Data<T>;
    }
  
    public abstract run(data: Data<T>): AnyState | Promise<AnyState>;
  
    public update(_time:number, _delta: number): void {}
}

class EndState extends State {
    public run(): Promise<State> {
      return Promise.reject('End state cannot be run');
    }
}

export const END = new EndState();


export class StateMachine {
    public readonly states: StateConstructor[];
    public currentState: State;

    public previousLogTime = 0;

    constructor(states: StateConstructor[], initState: State) {
        this.states = states;
        this.currentState = initState;
    }

    private logTrace(log: string): void {
        const timeNow = performance.now();
        const timeTook = Math.floor(timeNow - this.previousLogTime) / 1000;

        if (timeTook > 0.01) {
        log += ` ${timeTook}s`;
        }

        console.log(log);

        this.previousLogTime = timeNow;
    }

    public async run() {
        while (true) {
        this.logTrace(`[enter: ${this.currentState.constructor.name}]`);

        const nextState = await this.currentState.run(this.currentState.data);

        this.logTrace(`[exit: ${this.currentState.constructor.name}]`);

        if (nextState === END) {
            return;
        }

        if (!this.states.some((s) => nextState instanceof s)) {
            throw new Error('State is not supported by this StateMachine');
        }

            this.currentState = nextState as State<undefined>;
        }
    }

    public update(time: number, delta: number) { {
        this.currentState.update(time,delta);
    }
}
}

export async function awaitUntil(
    condition: () => boolean,
    checkInterval: number = 100,
    timeout: number = 10000
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const start = Date.now();
  
      const interval = setInterval(() => {
        if (condition()) {
          clearInterval(interval);
          resolve();
        }
        // } else if (Date.now() - start > timeout) {
        //   clearInterval(interval);
        //   reject(new Error("awaitUntil: condition timed out"));
        // }
      }, checkInterval);
    });
  }

