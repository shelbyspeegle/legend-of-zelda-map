export class SpriteSheet {
    height: number;
    name: 'Overworld';
    spriteDimension: number;
    spriteImg: HTMLImageElement;
    width: number;

    constructor(filename: string, name: 'Overworld', width: number, height: number, onLoad: () => void) {
        this.spriteImg = new Image();
        this.spriteImg.src = filename;
        this.spriteImg.onload = function() {
            if (!onLoad) {
                console.warn(`SpriteSheet - unused onLoad callback for ${filename}`);
                return;
            }
    
            onLoad();
        };
        this.name = name;
        this.spriteDimension = 16; // Measured in pixels.
        this.width = width;
        this.height = height;
    }

    spriteAtIndex( spriteIndex: number ) {
        return {
            x: spriteIndex % this.width,
            y: Math.floor(spriteIndex / this.width)
        };
    };
};
