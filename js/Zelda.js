/**
 * Created by shelbyspeegle on 5/1/15.
 */


// Sprites collected from spriters-resource.com.

var Zelda = Zelda || {};

window.onload = function() {
    Zelda.canvas = document.getElementById( 'baseLayer' );
    Zelda.highlight = document.getElementById( 'highlightLayer' );
    Zelda.canvas.addEventListener("mousemove", mouseMove, false);
    Zelda.canvas.addEventListener("mousedown", mouseClick, false);

    Zelda.context = Zelda.canvas.getContext( '2d' );
    Zelda.highlightContext = Zelda.highlight.getContext( '2d' );

    var highlighting = false;

    function mouseMove( event ) {
        var cursorPosition = getCursorPosition( event );
        var x = cursorPosition.x;
        var y = cursorPosition.y;

        if ( highlighting ) {
            // Saves unnecessary calls to clearRect.
            Zelda.highlightContext.clearRect( 0, 0, Zelda.highlight.width, Zelda.highlight.height );
            highlighting = false;
        }

        for ( var i = 0; i < Zelda.MapData.Overworld.pointsOfInterest.length; i++ ) {
            if ( x === Zelda.MapData.Overworld.pointsOfInterest[i].x &&
                y === Zelda.MapData.Overworld.pointsOfInterest[i].y ) {
                //Zelda.highlightContext.globalAlpha=0.2;
                Zelda.highlightContext.fillStyle="#ffffff";
                Zelda.highlightContext.fillRect( x*16, y*16, 16, 16 );
                highlighting = true;
            }
        }
    }

    function mouseClick( event ) {
        var cursorPosition = getCursorPosition( event );
        var x = cursorPosition.x;
        var y = cursorPosition.y;

        console.log( "x: " + x + "\t\ty: " + y );

        for ( var i = 0; i < Zelda.MapData.Overworld.pointsOfInterest.length; i++ ) {
            if ( x === Zelda.MapData.Overworld.pointsOfInterest[i].x &&
                y === Zelda.MapData.Overworld.pointsOfInterest[i].y ) {
                console.log( "At " + Zelda.MapData.Overworld.pointsOfInterest[i].title );

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
            x = event.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
        }

        x -= Zelda.canvas.offsetLeft;
        y -= Zelda.canvas.offsetTop;

        x = Math.floor( x/16 );
        y = Math.floor( y/16 );

        return { x:x, y:y };
    }

    var overworldMap = new Zelda.Map( Zelda.context, new Zelda.SpriteSheet("Overworld", 18, 8), 256, 88 );

    Zelda.canvas.height = Zelda.highlight.height = overworldMap.height * overworldMap.roomHeight * 16;
    Zelda.canvas.width = Zelda.highlight.width = overworldMap.width * overworldMap.roomWidth * 16;

    overworldMap.spriteSheet.spriteImg.onload = function() {
        overworldMap.render();
    };
};
