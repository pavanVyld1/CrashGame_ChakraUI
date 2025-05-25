export default class GameUtis {
    
    static getRandomFloatBetween(min: number, max: number, decimals: number = 2): number {
        const num = Phaser.Math.FloatBetween(min, max);
        return parseFloat(num.toFixed(decimals));
    }

    static generatePlayerId(): string {
        return 'player-' + Math.random().toString(36).substr(2, 9);
    }

    static getScaleValue(image : Phaser.GameObjects.RenderTexture , width : number, height : number) : {scalex: number, scaley : number}{
        return {scalex : width / image.width , scaley : height / image.height};
    }
}