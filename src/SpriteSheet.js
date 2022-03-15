export const SpriteSheet = function( filename, name, width, height, onLoad ) {
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
};

SpriteSheet.prototype.spriteAtIndex = function ( spriteIndex ) {
    return {
        x: spriteIndex % this.width,
        y: Math.floor(spriteIndex / this.width)
    };
};