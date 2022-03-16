import { SpriteSheet } from './SpriteSheet';
import { ZeldaMap } from './ZeldaMap';
import overworldPng from './img/Overworld.png';
// import dungeon1Png from './img/dungeon1.png';
import { MapEditor } from './MapEditor';

const body = document.getElementsByTagName('body')[0];
const html = document.getElementsByTagName('html')[0];

const style = document.createElement('style');
style.innerHTML = `
body {
  margin:0;
  padding:0;
  background: black;
  user-select: none;
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

const root = document.createElement('div');
root.id = 'root';
body.append(root);

const canvas = document.createElement('canvas');
root.append(canvas);

const context = canvas.getContext('2d');

let mapEditor: MapEditor | undefined;
let overworldMap: ZeldaMap;
const onSpriteLoadCallback = () => {
  if (mapEditor) {
    overworldMap.updateWithEdits(mapEditor.getEditedCopyOfRooms());
  }
  // overworldMap.updateWithEdits(overworld);
  overworldMap.render();
};
// Sprites collected from spriters-resource.com.
overworldMap = new ZeldaMap(context, new SpriteSheet(overworldPng, 'Overworld', 18, 8, onSpriteLoadCallback), 256, 88);
canvas.height = overworldMap.totalHeight;
canvas.width = overworldMap.totalWidth;
mapEditor = new MapEditor(canvas, overworldMap);

// Do not allow right clicks on canvas to open context menu.
canvas.addEventListener('contextmenu', (e) => e.preventDefault());

// Handle global keys.
document.addEventListener('keydown', (keyboardEvent: KeyboardEvent) => {
  // Toggle map editor.
  if (keyboardEvent.key === '/') {
    if (mapEditor.active) {
      mapEditor.disable();
    } else {
      mapEditor.enable();
    }
  }
});
