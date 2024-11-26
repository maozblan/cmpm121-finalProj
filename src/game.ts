import { GameMap } from "./models/map.ts";
// TUNEABLE GAME SETTINGS
const MAPSIZE = 10;

export const gameMap: GameMap = new GameMap(MAPSIZE);
export const gameData = {
  turn: 0,
}
