/**
 * Created by shelbyspeegle on 5/1/15.
 */


Zelda.SpriteSheet = Zelda.SpriteSheet || {};

Zelda.SpriteSheet = function( spriteImg, width, height ) {
    this.spriteDimension = 16; // Measured in pixels.
    this.width = width;
    this.height = height;
    this.spriteImg = spriteImg;
};