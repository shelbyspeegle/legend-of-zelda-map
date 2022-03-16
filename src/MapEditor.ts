import { ZeldaMap } from './ZeldaMap';

const TILE_SIZE = 16; // SSFIXME: get this from elsewhere.
const COLOR = 'white';

export class MapEditor {
  active: boolean; // Is this listening for keyboard / mouse events?

  activeHandlers: { [string: string]: (event: MouseEvent | KeyboardEvent) => void };

  canvas: HTMLCanvasElement; // Canvas for map editor UI.

  copiedTileValue: number | undefined;

  officialMapPng: HTMLImageElement; // Image element for "official" map.

  gameplayCanvas: HTMLCanvasElement; // Canvas for actual gameplay.

  highlightContext: CanvasRenderingContext2D;

  lastCursorPosition: { x: number; y: number } | undefined;

  overworldMap: ZeldaMap;

  roomEdits: number[][][][];

  constructor(gameplayCanvas: HTMLCanvasElement, overworldMap: ZeldaMap) {
    this.gameplayCanvas = gameplayCanvas;

    this.canvas = document.createElement('canvas');
    this.canvas.style.pointerEvents = 'none';
    this.canvas.height = gameplayCanvas.height;
    this.canvas.width = gameplayCanvas.width;
    this.canvas.style.zIndex = '2'; // on top of gameplayCanvas (0), and finalMapImage (1).

    const highlightContext = this.canvas.getContext('2d');
    this.highlightContext = highlightContext;

    // Attach canvas to DOM (div with id=root)
    const root = document.getElementById('root');
    root.append(this.canvas);

    this.overworldMap = overworldMap;

    // window.localStorage.clear();
    const roomEditsString: string | undefined = window.localStorage.getItem('edits');
    if (roomEditsString) {
      this.roomEdits = JSON.parse(roomEditsString);
    } else {
      this.roomEdits = JSON.parse(JSON.stringify(overworldMap.rooms));
    }

    this.officialMapPng = document.createElement('img');
    this.officialMapPng.src = 'http://ian-albert.com/games/legend_of_zelda_maps/zelda-overworld.png';
    this.officialMapPng.style.zIndex = '1';
    root.append(this.officialMapPng);

    this.enable();
  }

  enable() {
    // Setup and attach event listeners.
    this.activeHandlers = {};
    this.activeHandlers.keyDownFunction = (event: KeyboardEvent) => this.handleKeyDown(event);
    document.addEventListener('keydown', this.activeHandlers.keyDownFunction);
    this.activeHandlers.mouseMoveFunction = (event: MouseEvent) => this.mouseMove(event);
    this.activeHandlers.mouseDownFunction = (event: MouseEvent) => this.mouseDown(event);
    document.addEventListener('mousemove', this.activeHandlers.mouseMoveFunction);
    document.addEventListener('mousedown', this.activeHandlers.mouseDownFunction);

    // Add overlay of map from actual game.
    this.officialMapPng.style.opacity = '0.4';
    this.gameplayCanvas.style.opacity = '0.6';

    this.active = true;
  }

  disable() {
    // Remove event listeners.
    document.removeEventListener('keydown', this.activeHandlers.keyDownFunction);
    document.removeEventListener('mousemove', this.activeHandlers.mouseMoveFunction);
    document.removeEventListener('mousedown', this.activeHandlers.mouseDownFunction);
    this.active = false;
    this.highlightContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Remove overlay of map.
    this.officialMapPng.style.opacity = '0';
    this.gameplayCanvas.style.opacity = '1';
  }

  persistEdits() {
    window.localStorage.setItem('edits', JSON.stringify(this.roomEdits));
  }

  getEditedCopyOfRooms() {
    return this.roomEdits;
  }

  handleKeyDown(keyboardEvent: KeyboardEvent) {
    if (keyboardEvent.key === 'c') {
      if (!this.lastCursorPosition) {
        console.warn('Keydown (c) - no last cursor position - skipping copy.');
        return;
      }

      this.copiedTileValue = this.overworldMap.getTileAt(this.lastCursorPosition.x, this.lastCursorPosition.y);
      return;
    }
    if (keyboardEvent.key === 'v') {
      if (!this.lastCursorPosition) {
        console.warn('Keydown (v) - no last cursor position - skipping paste.');
        return;
      }
      if (this.copiedTileValue === undefined) {
        console.warn('Keydown (v) - no copiedTileValue - skipping paste.');
        return;
      }

      this.overworldMap.setTileAt(this.lastCursorPosition.x, this.lastCursorPosition.y, this.copiedTileValue);

      const room = this.overworldMap.getRoomAt(this.lastCursorPosition.x, this.lastCursorPosition.y);
      const roomXY = this.overworldMap.getRoomIndexAt(this.lastCursorPosition.x, this.lastCursorPosition.y);
      this.overworldMap.drawRoom(room, roomXY.x, roomXY.y);

      this.persistEdits();
      return;
    }

    if (keyboardEvent.key === 'Backspace') {
      if (!this.lastCursorPosition) {
        console.warn('Keydown (Backspace) - no last cursor position - skipping delete.');
        return;
      }

      // SSFIXME: enum?
      this.overworldMap.setTileAt(this.lastCursorPosition.x, this.lastCursorPosition.y, 200); // 200 is empty tile.

      const room = this.overworldMap.getRoomAt(this.lastCursorPosition.x, this.lastCursorPosition.y);
      const roomXY = this.overworldMap.getRoomIndexAt(this.lastCursorPosition.x, this.lastCursorPosition.y);
      this.overworldMap.drawRoom(room, roomXY.x, roomXY.y);

      this.persistEdits();
    }
  }

  getCursorPosition(event: MouseEvent) {
    let x = Number();
    let y = Number();

    if (event.x !== undefined && event.y !== undefined) {
      x = event.pageX;
      y = event.pageY;
    } else { // Firefox method to get the position
      x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    x -= this.canvas.offsetLeft;
    y -= this.canvas.offsetTop;

    x = Math.floor(x / 16);
    y = Math.floor(y / 16);

    return { x, y };
  }

  mouseDown(event: MouseEvent) {
    let clickType: 'left' | 'right' | 'unknown';
    if (event.button === 0) {
      clickType = 'left';
    } else if (event.button === 2) {
      clickType = 'right';
    } else {
      clickType = 'unknown';
    }
    const cursorPosition = this.getCursorPosition(event);

    const { x } = cursorPosition;
    const { y } = cursorPosition;

    //   console.log(`x: ${x}\t\ty: ${y}`);

    // for (let i = 0; i < MapData.Overworld.pointsOfInterest.length; i += 1) {
    //   if (x === MapData.Overworld.pointsOfInterest[i].x
    //             && y === MapData.Overworld.pointsOfInterest[i].y) {
    //     //   console.log(`At ${MapData.Overworld.pointsOfInterest[i].title}`);
    //   }
    // }

    const roomXIndex = Math.floor(x / this.overworldMap.roomWidth);
    const roomYIndex = Math.floor(y / this.overworldMap.roomHeight);

    const roomTileXIndex = x % (this.overworldMap.roomWidth);
    const roomTileYIndex = y % (this.overworldMap.roomHeight);

    const room = this.overworldMap.getRoomAt(x, y);

    if (clickType === 'right') {
      room[roomTileYIndex][roomTileXIndex] += 1;
    } else if (clickType === 'left') {
      room[roomTileYIndex][roomTileXIndex] -= 1;
    }

    this.overworldMap.drawRoom(room, roomXIndex, roomYIndex);

    this.persistEdits();
  }

  mouseMove(event: MouseEvent) {
    const cursorPosition = this.getCursorPosition(event);

    if (this.lastCursorPosition?.x === cursorPosition.x && this.lastCursorPosition.y === cursorPosition.y) {
      // exit early - same tile.
      return;
    }

    this.lastCursorPosition = cursorPosition;

    this.highlightTile(cursorPosition.x, cursorPosition.y);
  }

  highlightTile(x: number, y: number) {
    this.highlightContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // for (let i = 0; i < MapData.Overworld.pointsOfInterest.length; i += 1) {
    //   if (x === MapData.Overworld.pointsOfInterest[i].x
    //         && y === MapData.Overworld.pointsOfInterest[i].y) {
    //   // Zelda.this.highlightContext.globalAlpha=0.2;
    //     this.highlightContext.fillStyle = '#ffffff';
    //     this.highlightContext.fillRect(x * size, y * size, size, size);
    //   }
    // }

    // Outline tile.
    this.highlightContext.strokeStyle = COLOR;
    this.highlightContext.strokeRect(x * TILE_SIZE - 1, y * TILE_SIZE - 1, TILE_SIZE + 1, TILE_SIZE + 1);

    // Outline room.
    const roomXIndex = Math.floor(x / this.overworldMap.roomWidth);
    const roomYIndex = Math.floor(y / this.overworldMap.roomHeight);
    this.highlightContext.strokeRect(
      roomXIndex * this.overworldMap.roomWidth * TILE_SIZE,
      roomYIndex * this.overworldMap.roomHeight * TILE_SIZE,
      this.overworldMap.roomWidth * TILE_SIZE,
      this.overworldMap.roomHeight * TILE_SIZE,
    );

    // Draw room / tile text.
    // Magic numbers are offsets to move text away from room.
    this.highlightContext.fillStyle = COLOR;
    this.highlightContext.font = '16px monospace';

    // Text above room by default.
    let textY = (roomYIndex * this.overworldMap.roomHeight * TILE_SIZE) + -4;
    if (roomYIndex === 0) {
      // For case where text should be below room.
      textY = ((roomYIndex + 1) * this.overworldMap.roomHeight * TILE_SIZE) + 12;
    }

    this.highlightContext.fillText(
      `room:${roomXIndex},${roomYIndex} tile:${x},${y} (x,y)`,
      roomXIndex * this.overworldMap.roomWidth * TILE_SIZE + 4,
      textY,
    );
  }
}
