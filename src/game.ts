import { GameMap } from "./models/map.ts";
import { Player } from "./models/player.ts";
// TUNEABLE GAME SETTINGS
const MAPSIZE = 10;

export let gameMap: GameMap = new GameMap(MAPSIZE);

export let currentIndex = 0;

const mapUpdateLedger: GameMap[] = [gameMap];

export function updateMap(newMap: GameMap | null){
  if(newMap !== null){
    gameMap = newMap;
    mapUpdateLedger.splice(currentIndex + 1);
    mapUpdateLedger.push(newMap);
    currentIndex = mapUpdateLedger.length - 1;
  }
  document.dispatchEvent(new Event("update"));
}

export function undo(){
  currentIndex--;
  if(currentIndex < 0){
    currentIndex = 0;
  }
  gameMap = mapUpdateLedger[currentIndex];
}

export function redo(){
  currentIndex++;
  if(currentIndex > mapUpdateLedger.length - 1){
    currentIndex = mapUpdateLedger.length - 1;
  }
  gameMap = mapUpdateLedger[currentIndex];
}
export const player = new Player(0, 0);
