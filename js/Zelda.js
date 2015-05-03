/**
 * Created by shelbyspeegle on 5/1/15.
 */


// Sprites collected from spriters-resource.com.

var Zelda = Zelda || {};

window.onload = function() {
    var canvas = document.getElementById( 'spriteContainer' );
    var context = canvas.getContext( '2d' );

    var overworldImage = new Image();
    overworldImage.onload = function() {
        context.render();
    };

    overworldImage.src = 'img/overworld.png';
    var overworldSprite = new Zelda.SpriteSheet( overworldImage, 18, 8 );

    // Overworld
    var overworldMap = new Zelda.Map( overworldSprite );

    context.render = function () {
        for (var x = 0; x < 256; x++ ) {
            for (var y = 0; y < 88; y++ ) {
                this.drawSprite( overworldSprite, Zelda.Map.overworld[y][x], x, y );
            }
        }
    };

    context.drawSprite = function ( sprite, spriteIndex, x, y ) {
        var scale = 1.0;
        var spriteCoordinates = overworldMap.spriteAtIndex(spriteIndex);

        context.drawImage(
            sprite.spriteImg,
            (spriteCoordinates.x + 1) + (spriteCoordinates.x * sprite.spriteDimension),
            (spriteCoordinates.y + 1) + (spriteCoordinates.y * sprite.spriteDimension),
            sprite.spriteDimension,             // spriteHeight
            sprite.spriteDimension,             // spriteWidth
            sprite.spriteDimension * x * scale, // canvasPosX
            sprite.spriteDimension * y * scale, // canvasPosY
            sprite.spriteDimension * scale,     // spriteHeight
            sprite.spriteDimension * scale      // spriteWidth
        );

    };

    canvas.height = 88 * 16;
    canvas.width = 256 * 16;
};