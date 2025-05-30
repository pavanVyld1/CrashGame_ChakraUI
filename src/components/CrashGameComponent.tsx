import React, { Component } from "react";
import Phaser from "phaser";
import CrashGameScene from "../game/CrashGameScene";
import SocketManager from "../Pages/Managers/SocketManager";
import { GameState } from "../services/socketService";

// type GameState =
//   | "init"
//   | "ready"
//   | "waiting_for_bet"
//   | "starting"
//   | "started"
//   | "running"
//   | "crashed"
//   | "end";

interface CrashGameState {
  gameState: GameState;
  multiplier: number;
  autoBet: boolean;
  autoCashout: boolean;
  autoCashoutValue: number;
  betPlaced: boolean;
  hasCashedOut: boolean;
}

export default class CrashGameComponent extends Component<{width: number; height: number}, CrashGameState> {
  private phaserGame: Phaser.Game | null = null;
  private multiplierTimer: NodeJS.Timeout | null = null;

  constructor(props: {width: number; height: number}) {
    super(props);
    this.state = {
      gameState: "init",
      multiplier: 1.0,
      autoBet: false,
      autoCashout: false,
      autoCashoutValue: 2.0,
      betPlaced: false,
      hasCashedOut: false,
    };
  }

  componentDidMount(): void {
    this.initPhaserGame();
    SocketManager.onSessionState((data)=>{
      console.log("Received session state:", data);
      this.transitionToState(data);
    });

    SocketManager.onTick((tick) => {
    console.log("Received tick:", tick.value);
      this.setState({ multiplier: tick.value });
      this.updateMultiplierInGame(tick.value);
    });
    // this.transitionToState("ready");
  }

  componentWillUnmount(): void {
    if (this.phaserGame) {
      this.phaserGame.destroy(true);
    }
    if (this.multiplierTimer) {
      clearInterval(this.multiplierTimer);
    }
  }

  initPhaserGame(): void {
    this.phaserGame = new Phaser.Game({
      type: Phaser.AUTO,
      width: this.props.width,
      height: this.props.height,
      parent: "phaser-container",
      scene: [CrashGameScene],
    });
  }

  transitionToState(newState: GameState): void {
    console.log(`Transitioning to: ${newState}`);
    this.setState({ gameState: newState }, () => {
      this.onStateChange(newState);
    });
  }

  onStateChange = (newState: GameState): void => {
    const gameScene = this.phaserGame?.scene.keys["CrashGameScene"] as CrashGameScene;

    switch (newState) {
      case "init":
        break;
      case "ready":
        // setTimeout(() => this.transitionToState("waiting_for_bet"), 3000);
        break;
      case "waiting_for_bet":
        this.setState({ betPlaced: false, hasCashedOut: false, multiplier: 1.0 });
        // setTimeout(() => this.transitionToState("starting"), 10000);
        break;

      case "starting":
        setTimeout(() => this.transitionToState("started"), 100);
        break;

      case "started":
        gameScene?.startGame();
        // this.transitionToState("running");
        break;

      case "running":
        // this.startMultiplierIncrease();
        break;

      case "crashed":
        gameScene?.onCrash();
        if (this.multiplierTimer) {
          clearInterval(this.multiplierTimer);
        }
        setTimeout(() => this.transitionToState("end"), 2000);
        break;

      case "end":
        setTimeout(() => this.transitionToState("waiting_for_bet"), 3000);
        break;
    }
  };

  startMultiplierIncrease(): void {
    this.multiplierTimer = setInterval(() => {
      this.setState(
        (prevState) => ({
          multiplier: parseFloat((prevState.multiplier + 0.01).toFixed(2)),
        }),
        () => {
          const { multiplier, autoCashout, autoCashoutValue, hasCashedOut } = this.state;
          const gameScene = this.phaserGame?.scene.keys["CrashGameScene"] as CrashGameScene;
          gameScene?.updateMultiplier(multiplier);

          if (autoCashout && multiplier >= autoCashoutValue && !hasCashedOut) {
            this.handleCashout();
          }

          if (multiplier >= 10.0) {
            this.transitionToState("crashed");
          }
        }
      );
    }, 100);
  }

  updateMultiplierInGame(multiplier: number) {
    const scene = this.phaserGame?.scene?.getScene('CrashGameScene') as CrashGameScene;
    if (scene && scene.updateMultiplier) {
      scene.updateMultiplier(multiplier);
    }
  }

  handleBet = (): void => {
    this.setState({ betPlaced: true }, () => {
      this.transitionToState("starting");
    });
  };

  handleCashout = (): void => {
    if (!this.state.hasCashedOut) {
      this.setState({ hasCashedOut: true });
      console.log(`Cashed out at ${this.state.multiplier}x`);
    }
  };

  render(): React.ReactNode {
    const { gameState, multiplier, autoBet, autoCashout, autoCashoutValue } = this.state;

    return (
      <div className="crash-game">
        <h2>Crash Game: {gameState.toUpperCase()}</h2>
        <p>Multiplier: {multiplier.toFixed(2)}x</p>

        {gameState === "waiting_for_bet" && (
          <>
            <button onClick={this.handleBet}>Place Bet</button>
            <label>
              <input
                type="checkbox"
                checked={autoBet}
                onChange={(e) => this.setState({ autoBet: e.target.checked })}
              />
              Auto Bet
            </label>
            <label>
              <input
                type="checkbox"
                checked={autoCashout}
                onChange={(e) => this.setState({ autoCashout: e.target.checked })}
              />
              Auto Cashout
            </label>
            {autoCashout && (
              <input
                type="number"
                value={autoCashoutValue}
                min={1}
                max={10}
                step={0.1}
                onChange={(e) =>
                  this.setState({ autoCashoutValue: parseFloat(e.target.value) })
                }
              />
            )}
          </>
        )}

        {gameState === "running" && !autoCashout && (
          <button onClick={this.handleCashout}>Cash Out</button>
        )}

        <div id="phaser-container" style={{ width: 800, height: 600 }}></div>
      </div>
    );
  }
}
