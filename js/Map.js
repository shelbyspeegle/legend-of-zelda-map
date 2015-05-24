/**
 * Created by shelbyspeegle on 5/3/15.
 */


Zelda.Map = Zelda.Map || {};

Zelda.Map = function( context, spriteSheet, width, height ) {
    this.context = context; // Canvas.
    this.rooms = Zelda.MapData[spriteSheet.name].rooms;
    this.height = this.rooms.length;
    this.width = this.rooms["0"].length;
    this.roomWidth = width/this.width;
    this.roomHeight = height/this.height;
    this.spriteSheet = spriteSheet;
};

Zelda.Map.prototype.render = function () {
    for ( var roomY = 0; roomY < this.height; roomY++ ) {
        for ( var roomX = 0; roomX < this.width; roomX++ ) {
            var room = this.rooms[roomY][roomX];
            room.x = roomX;
            room.y = roomY;
            this.drawRoom( room );
        }
    }
};

Zelda.Map.prototype.drawRoom = function ( room ) {
    var offsetX = room.x * this.roomWidth;
    var offsetY = room.y * this.roomHeight;

    for (var x = 0; x < this.roomWidth; x++ ) {
        for (var y = 0; y < this.roomHeight; y++ ) {
            this.drawSprite( room[y][x], offsetX + x, offsetY + y );
        }
    }
};

Zelda.Map.prototype.drawSprite = function ( spriteIndex, x, y ) {
    var scale = 1.0;
    var spriteCoordinates = this.spriteSheet.spriteAtIndex(spriteIndex);

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