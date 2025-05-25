
export interface IButton {
    onPress(): void;
    onRelease(): void;
}

export interface IResizable {
    onResize(gameSize: Phaser.Structs.Size): void;
}

