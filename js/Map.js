/**
 * Created by shelbyspeegle on 5/3/15.
 */


Zelda.Map = Zelda.Map || {};

Zelda.Map = function( context, spriteSheet, width, height ) {
    this.context = context; // Canvas.
    this.width = width;
    this.height = height;
    this.map = Zelda.MapData[spriteSheet.name];
    this.spriteSheet = spriteSheet;
    this.pointsOfInterest = [];
};

Zelda.Map.prototype.spriteAtIndex = function ( spriteIndex ) {
    return {
        x: spriteIndex % this.spriteSheet.width,
        y: Math.floor(spriteIndex / this.spriteSheet.width)
    };
};

Zelda.Map.prototype.render = function () {
    for (var x = 0; x < this.width; x++ ) {
        for (var y = 0; y < this.height; y++ ) {
            this.drawSprite( this.map[y][x], x, y );
        }
    }
};

Zelda.Map.prototype.drawSprite = function ( spriteIndex, x, y ) {
    var scale = 1.0;
    var spriteCoordinates = this.spriteAtIndex(spriteIndex);

    this.context.drawImage(
        this.spriteSheet.spriteImg,
        (spriteCoordinates.x + 1) + (spriteCoordinates.x * this.spriteSheet.spriteDimension),
        (spriteCoordinates.y + 1) + (spriteCoordinates.y * this.spriteSheet.spriteDimension),
        this.spriteSheet.spriteDimension,             // spriteHeight
        this.spriteSheet.spriteDimension,             // spriteWidth
        this.spriteSheet.spriteDimension * x * scale, // canvasPosX
        this.spriteSheet.spriteDimension * y * scale, // canvasPosY
        this.spriteSheet.spriteDimension * scale,     // spriteHeight
        this.spriteSheet.spriteDimension * scale      // spriteWidth
    );
};