/**
 * Created by shelbyspeegle on 5/1/15.
 */


// Sprites collected from spriters-resource.com.

var Zelda = Zelda || {};

var currentMap;
var dungeon1Map;

window.onload = function() {
    Zelda.canvas = document.getElementById( 'spriteContainer' );
    Zelda.context = Zelda.canvas.getContext( '2d' );

    // Overworld
    var overworldSprite = new Zelda.SpriteSheet( "overworld", 18, 8 );
    var overworldMap = new Zelda.Map( Zelda.context, overworldSprite, 256, 88 );

    var dungeon1Sprite = new Zelda.SpriteSheet( "dungeon1", 16, 11 );
    dungeon1Map = new Zelda.Map( Zelda.context, dungeon1Sprite, 16, 11 );

    setMap( overworldMap );
};

setMap = function ( newMap ) {
    currentMap = newMap;
    Zelda.canvas.height = currentMap.height * 16;
    Zelda.canvas.width = currentMap.width * 16;

    if (currentMap.spriteSheet.spriteImg.complete) {
        currentMap.render();
    } else {
        currentMap.spriteSheet.spriteImg.onload = function() {
            currentMap.render();
        }
    }
};
