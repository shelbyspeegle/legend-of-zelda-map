/* eslint-disable no-underscore-dangle */
import overworld from './overworld.json';

const ___ = 200; // Temporary value to hold the index of a null sprite.
const OOO = 222; // Temporary value to signify some sort of entrance.

// Room coordinate scheme pulled from image at:
// http://tartarus.rpgclassics.com/zelda1/1stquest/images/Overworld/lowbandwidth/gridmaplowyes.gif
// SSFIXME: move all data into overworld.json.
export const MapData = {
  Overworld: {
    rooms: overworld,
    pointsOfInterest: [
      { title: 'Gambling1', x: 9, y: 12 },

      { title: 'Dungeon1', x: 88, y: 48 },
      { title: 'Dungeon6', x: 40, y: 26 }, // TODO: is this x-position right?

      { title: 'DoorRepair1', x: 25, y: 1 },

      { title: 'ItemShop1', x: 40, y: 12 },
    ],
  },
};
