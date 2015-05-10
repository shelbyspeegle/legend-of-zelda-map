/**
 * Created by shelbyspeegle on 5/1/15.
 */


Zelda.SpriteSheet = Zelda.SpriteSheet || {};

Zelda.SpriteSheet = function( name, width, height ) {
    this.spriteImg = new Image();
    this.spriteImg.src = "img/" + name + ".png";
    this.name = name;
    this.spriteDimension = 16; // Measured in pixels.
    this.width = width;
    this.height = height;
};