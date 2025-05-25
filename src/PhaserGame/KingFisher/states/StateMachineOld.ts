import { GameState } from "./GameState";

export default class StateMachineOld {
  private currentState: GameState;
  private stateListeners: ((state: GameState) => void)[] = [];

  constructor(initialState: GameState) {
    this.currentState = initialState;
  }

  getState(): GameState {
    return this.currentState;
  }

  setState(newState: GameState) {
    if (this.currentState !== newState) {
      this.currentState = newState;
      this.stateListeners.forEach((listener) => listener(newState));
    }
  }

  onStateChange(listener: (state: GameState) => void) {
    this.stateListeners.push(listener);
  }
}
