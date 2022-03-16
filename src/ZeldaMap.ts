import { MapData } from './constants/MapData';
import { SpriteSheet } from './SpriteSheet';

export class ZeldaMap {
  height: number;

  width: number;

  roomHeight: number;

  roomWidth: number;

  totalWidth: number;

  totalHeight: number;

  spriteSheet;

  context;

  rooms: number[][][][];

  constructor(
    context: CanvasRenderingContext2D,
    spriteSheet: SpriteSheet,
    width: number,
    height: number,
  ) {
    const size = spriteSheet.spriteDimension;

    this.context = context; // Canvas.
    this.rooms = MapData[spriteSheet.name].rooms;
    this.height = this.rooms.length;
    this.width = this.rooms['0'].length;
    this.roomWidth = width / this.width;
    this.roomHeight = height / this.height;
    this.totalHeight = this.height * this.roomHeight * size;
    this.totalWidth = this.width * this.roomWidth * size;

    this.spriteSheet = spriteSheet;
  }

  updateWithEdits(edits: number[][][][]) {
    this.rooms = edits;
  }

  render() {
    for (let roomY = 0; roomY < this.height; roomY += 1) {
      for (let roomX = 0; roomX < this.width; roomX += 1) {
        const room = this.rooms[roomY][roomX];
        this.drawRoom(room, roomX, roomY);
      }
    }
  }

  drawRoom(room: number[][], roomX: number, roomY: number) {
    const offsetX = roomX * this.roomWidth;
    const offsetY = roomY * this.roomHeight;

    const size = this.spriteSheet.spriteDimension;

    // clear entire room before drawing;
    this.context.clearRect(offsetX * size, offsetY * size, this.roomWidth * size, this.roomHeight * size);

    for (let x = 0; x < this.roomWidth; x += 1) {
      for (let y = 0; y < this.roomHeight; y += 1) {
        this.drawSprite(room[y][x], offsetX + x, offsetY + y);
      }
    }
  }

  // SSFIXME: can we get rid of this?
  getRoomIndexAt(mapX: number, mapY: number) {
    const roomXIndex = Math.floor(mapX / this.roomWidth);
    const roomYIndex = Math.floor(mapY / this.roomHeight);

    return { x: roomXIndex, y: roomYIndex };
  }

  getRoomAt(mapX: number, mapY: number) {
    const roomXIndex = Math.floor(mapX / this.roomWidth);
    const roomYIndex = Math.floor(mapY / this.roomHeight);

    return this.rooms[roomYIndex][roomXIndex];
  }

  getTileAt(mapX: number, mapY: number) {
    const room = this.getRoomAt(mapX, mapY);
    const roomTileXIndex = mapX % (this.roomWidth);
    const roomTileYIndex = mapY % (this.roomHeight);
    return room[roomTileYIndex][roomTileXIndex];
  }

  setTileAt(mapX: number, mapY: number, tileValue: number) {
    const room = this.getRoomAt(mapX, mapY);
    const roomTileXIndex = mapX % (this.roomWidth);
    const roomTileYIndex = mapY % (this.roomHeight);
    room[roomTileYIndex][roomTileXIndex] = tileValue;
  }

  drawSprite(spriteIndex: number, x: number, y: number) {
    const scale = 1.0;
    const spriteCoordinates = this.spriteSheet.spriteAtIndex(spriteIndex);

    this.context.drawImage(
      this.spriteSheet.spriteImg,
      (spriteCoordinates.x + 1) + (spriteCoordinates.x * this.spriteSheet.spriteDimension),
      (spriteCoordinates.y + 1) + (spriteCoordinates.y * this.spriteSheet.spriteDimension),
      this.spriteSheet.spriteDimension, // spriteHeight
      this.spriteSheet.spriteDimension, // spriteWidth
      this.spriteSheet.spriteDimension * x * scale, // canvasPosX
      this.spriteSheet.spriteDimension * y * scale, // canvasPosY
      this.spriteSheet.spriteDimension * scale, // spriteHeight
      this.spriteSheet.spriteDimension * scale, // spriteWidth
    );
  }
}
