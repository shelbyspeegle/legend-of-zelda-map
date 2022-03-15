import { MapData } from './constants/MapData';
import { SpriteSheet } from './SpriteSheet';

export class ZeldaMap {
  height: number;

  width: number;

  roomHeight: number;

  roomWidth: number;

  spriteSheet;

  context;

  rooms: number[][][][];

  constructor(
    context: CanvasRenderingContext2D,
    spriteSheet: SpriteSheet,
    width: number,
    height: number,
  ) {
    this.context = context; // Canvas.
    this.rooms = MapData[spriteSheet.name].rooms;
    this.height = this.rooms.length;
    this.width = this.rooms['0'].length;
    this.roomWidth = width / this.width;
    this.roomHeight = height / this.height;
    this.spriteSheet = spriteSheet;
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

    for (let x = 0; x < this.roomWidth; x += 1) {
      for (let y = 0; y < this.roomHeight; y += 1) {
        this.drawSprite(room[y][x], offsetX + x, offsetY + y);
      }
    }
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
