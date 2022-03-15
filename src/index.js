import { MapData } from './MapData';
import { SpriteSheet } from './SpriteSheet';
import { ZeldaMap } from './ZeldaMap';
import overworldPng from './img/Overworld.png';
// import dungeon1Png from './img/dungeon1.png';

const body = document.getElementsByTagName( "body" )[0];
const html = document.getElementsByTagName( "html" )[0];

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
finalMapImage.style.opacity = '0.6'

const canvas = document.createElement('canvas');
canvas.style.opacity = '0.6'
canvas.addEventListener("mousemove", mouseMove, false);
canvas.addEventListener("mousedown", mouseClick, false);

root.append(highlight);
root.append(finalMapImage);
root.append(canvas);

const context = canvas.getContext( '2d' );
const highlightContext = highlight.getContext( '2d' );

var highlighting = false;

function mouseMove( event ) {
    var cursorPosition = getCursorPosition( event );
    var x = cursorPosition.x;
    var y = cursorPosition.y;

    if ( highlighting ) {
        // Saves unnecessary calls to clearRect.
        highlightContext.clearRect( 0, 0, highlight.width, highlight.height );
        highlighting = false;
    }

    for ( var i = 0; i < MapData.Overworld.pointsOfInterest.length; i++ ) {
        if ( x === MapData.Overworld.pointsOfInterest[i].x &&
            y === MapData.Overworld.pointsOfInterest[i].y ) {
            //Zelda.highlightContext.globalAlpha=0.2;
            highlightContext.fillStyle="#ffffff";
            highlightContext.fillRect( x*16, y*16, 16, 16 );
            highlighting = true;
        }
    }
}

function mouseClick( event ) {
    var cursorPosition = getCursorPosition( event );
    var x = cursorPosition.x;
    var y = cursorPosition.y;

    console.log( "x: " + x + "\t\ty: " + y );

    for ( var i = 0; i < MapData.Overworld.pointsOfInterest.length; i++ ) {
        if ( x === MapData.Overworld.pointsOfInterest[i].x &&
            y === MapData.Overworld.pointsOfInterest[i].y ) {
            console.log( "At " + MapData.Overworld.pointsOfInterest[i].title );
        }
    }
}

function getCursorPosition( event ) {
    var x = Number();
    var y = Number();

    if ( event.x != undefined && event.y != undefined ) {
        x = event.pageX;
        y = event.pageY;
    }
    else { // Firefox method to get the position
        x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    x = Math.floor( x/16 );
    y = Math.floor( y/16 );

    return { x:x, y:y };
}

// Sprites collected from spriters-resource.com.
const onSpriteLoadCallback = () => {
    overworldMap.render();
};
var overworldMap = new ZeldaMap( context, new SpriteSheet(overworldPng, 'Overworld', 18, 8, onSpriteLoadCallback), 256, 88);

canvas.height = highlight.height = overworldMap.height * overworldMap.roomHeight * 16;
canvas.width = highlight.width = overworldMap.width * overworldMap.roomWidth * 16;
