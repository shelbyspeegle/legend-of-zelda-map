import { MapData } from './constants/MapData';
import { SpriteSheet } from './SpriteSheet';
import { ZeldaMap } from './ZeldaMap';
import overworldPng from './img/Overworld.png';
// import dungeon1Png from './img/dungeon1.png';

const body = document.getElementsByTagName('body')[0];
const html = document.getElementsByTagName('html')[0];

const style = document.createElement('style');
style.innerHTML = `
body {
    margin:0;
    padding:0;
    background: black;
}

canvas {
    position: absolute;
    top: 0;
    left: 0;
    image-rendering: optimizeSpeed;             /* Older versions of FF          */
    image-rendering: -moz-crisp-edges;          /* FF 6.0+                       */
    image-rendering: -webkit-optimize-contrast; /* Safari                        */
    image-rendering: -o-crisp-edges;            /* OS X & Windows Opera (12.02+) */
    image-rendering: pixelated;                 /* Awesome future-browsers       */
    -ms-interpolation-mode: nearest-neighbor;   /* IE                            */
}
`;

html.append(style);

const root = document.createElement('root');
body.append(root);

const highlight = document.createElement('canvas');

const finalMapImage = document.createElement('img');
finalMapImage.src = 'http://ian-albert.com/games/legend_of_zelda_maps/zelda-overworld.png';
finalMapImage.style.opacity = '0.6';

const canvas = document.createElement('canvas');
canvas.style.opacity = '0.6';

root.append(highlight);
root.append(finalMapImage);
root.append(canvas);

const context = canvas.getContext('2d');
const highlightContext = highlight.getContext('2d');

function getCursorPosition(event: MouseEvent) {
  let x = Number();
  let y = Number();

  if (event.x !== undefined && event.y !== undefined) {
    x = event.pageX;
    y = event.pageY;
  } else { // Firefox method to get the position
    x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  x = Math.floor(x / 16);
  y = Math.floor(y / 16);

  return { x, y };
}

let highlighting = false;
function mouseMove(event: MouseEvent) {
  const cursorPosition = getCursorPosition(event);
  const { x } = cursorPosition;
  const { y } = cursorPosition;

  if (highlighting) {
    // Saves unnecessary calls to clearRect.
    highlightContext.clearRect(0, 0, highlight.width, highlight.height);
    highlighting = false;
  }

  for (let i = 0; i < MapData.Overworld.pointsOfInterest.length; i += 1) {
    if (x === MapData.Overworld.pointsOfInterest[i].x
            && y === MapData.Overworld.pointsOfInterest[i].y) {
      // Zelda.highlightContext.globalAlpha=0.2;
      highlightContext.fillStyle = '#ffffff';
      highlightContext.fillRect(x * 16, y * 16, 16, 16);
      highlighting = true;
    }
  }
}

function mouseClick(event: MouseEvent) {
  const cursorPosition = getCursorPosition(event);
  const { x } = cursorPosition;
  const { y } = cursorPosition;

  //   console.log(`x: ${x}\t\ty: ${y}`);

  for (let i = 0; i < MapData.Overworld.pointsOfInterest.length; i += 1) {
    if (x === MapData.Overworld.pointsOfInterest[i].x
              && y === MapData.Overworld.pointsOfInterest[i].y) {
      //   console.log(`At ${MapData.Overworld.pointsOfInterest[i].title}`);
    }
  }
}

let overworldMap: ZeldaMap;
const onSpriteLoadCallback = () => {
  overworldMap.render();
};
// Sprites collected from spriters-resource.com.
overworldMap = new ZeldaMap(context, new SpriteSheet(overworldPng, 'Overworld', 18, 8, onSpriteLoadCallback), 256, 88);

canvas.height = overworldMap.height * overworldMap.roomHeight * 16;
highlight.height = canvas.height;
canvas.width = overworldMap.width * overworldMap.roomWidth * 16;
highlight.width = canvas.width;

canvas.addEventListener('mousemove', mouseMove, false);
canvas.addEventListener('mousedown', mouseClick, false);
