import { GameMap } from "./models/map.ts";
import { Player } from "./models/player.ts";


// TUNEABLE GAME SETTINGS
const MAPSIZE = 10;

//a stand-in for document.cookie for testing
let document_cookie = "";

interface SaveData {
  autosave: string;
  save1: string;
  save2: string;
}


interface updateLedgerIntry {
  map: GameMap;
  turn: number;
}

interface updateLedgerIntryStringStructure {
  map: string;
  turn: number;
}

interface GameState {
  currentTurn: number;
  currentIndex: number;
  mapUpdateLedger: updateLedgerIntry[];
}

export function getCurrentMap(): GameMap{
  return gameState.mapUpdateLedger[gameState.currentIndex].map;
}

interface GameStateStringStructure {
  currentTurn: number;
  currentIndex: number;
  mapUpdateLedger: updateLedgerIntryStringStructure[];
}


function mapStringify(map: GameMap): string{
  const bytes = new Uint8Array(map.exportBuffer());
  let str = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return btoa(str);
}
function mapParse(str64: string): GameMap{
  let str = atob(str64);
  const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
        bytes[i] = str.charCodeAt(i);
    }
  const tmpGameMap = new GameMap(MAPSIZE);
  
  tmpGameMap.loadBuffer(bytes.buffer);
  return tmpGameMap;
}
function updateLedgerStringify(ledger: updateLedgerIntry[]): updateLedgerIntryStringStructure[]{
  const strStruct: updateLedgerIntryStringStructure[] = [];
  for(let i = 0; i < ledger.length; i++){
    strStruct.push({map: mapStringify(ledger[i].map), turn: ledger[i].turn});
  }
  return strStruct;
}

function updateLedgerParse(strStruct: updateLedgerIntryStringStructure[]): updateLedgerIntry[]{
  let tmpLedger: updateLedgerIntry[] = [];
  for(let i = 0; i < strStruct.length; i++){
    tmpLedger.push({map: mapParse(strStruct[i].map), turn: strStruct[i].turn});
  }
  return tmpLedger;
}

function GameStateStringify(state: GameState): string{
  const strStruct: GameStateStringStructure = {
    currentTurn: state.currentTurn,
    currentIndex: state.currentIndex,
    mapUpdateLedger: updateLedgerStringify(state.mapUpdateLedger)
  }
  return JSON.stringify(strStruct);
}

function GameStateParse(str: string): GameState{
  const strStruct: GameStateStringStructure = JSON.parse(str);

  let tmpState: GameState = {
    currentTurn: strStruct.currentTurn,
    currentIndex: strStruct.currentIndex,
    mapUpdateLedger: updateLedgerParse(strStruct.mapUpdateLedger)
  }
  return tmpState;
}


export let gameState: GameState = {
  currentTurn: 0,
  currentIndex: 0,
  mapUpdateLedger: [{map: new GameMap(MAPSIZE), turn: 0}]
}

export function save(slot: "autosave"|"save1"|"save2"){
  if(document_cookie === ""){
    const saveDataObject: SaveData = {autosave: "", save1: "", save2: ""};
    saveDataObject[slot] = GameStateStringify(gameState);
    document_cookie = JSON.stringify(saveDataObject);
    //console.log(saveDataObject);
  }
  else{
    const saveDataObject: SaveData = JSON.parse(document_cookie);
    saveDataObject[slot] = GameStateStringify(gameState);
    document_cookie = JSON.stringify(saveDataObject);
    //console.log(saveDataObject);
  }
}

export function tryLoad(slot: "autosave"|"save1"|"save2"){
  if(document_cookie !== ""){
    const saveDataObject: SaveData = JSON.parse(document_cookie);
    if(saveDataObject[slot] !== ""){
      let tmp: GameState = GameStateParse(saveDataObject[slot]);
      //console.log(tmp);
      gameState = tmp;
    }
  }
}

export function updateMap(newMap: GameMap | null){
  if(newMap !== null){
    gameState.mapUpdateLedger.splice(gameState.currentIndex + 1);
    gameState.mapUpdateLedger.push({map: newMap.copy(), turn: gameState.currentTurn});
    gameState.currentIndex = gameState.mapUpdateLedger.length - 1;
    save("autosave");
  }
  document.dispatchEvent(new Event("update"));
}

export function setTurn(turn: number){
  gameState.currentTurn = turn;
}

export function undo(){
  gameState.currentIndex--;
  if(gameState.currentIndex < 0){
    gameState.currentIndex = 0;
  }
  gameState.currentTurn = gameState.mapUpdateLedger[gameState.currentIndex].turn;
  save("autosave");
  document.dispatchEvent(new Event("update"));
}

export function redo(){
  gameState.currentIndex++;
  if(gameState.currentIndex > gameState.mapUpdateLedger.length - 1){
    gameState.currentIndex = gameState.mapUpdateLedger.length - 1;
  }
  gameState.currentTurn = gameState.mapUpdateLedger[gameState.currentIndex].turn;
  save("autosave");
  document.dispatchEvent(new Event("update"));
}
export const player = new Player(0, 0);
