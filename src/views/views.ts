import { GameMap } from "../models/map.ts";
import { Player } from "../models/player.ts";
import { gameState, player } from "../game.ts";

export function createMap(map: GameMap): void {
  const field = document.querySelector<HTMLDivElement>("#field")!;
  while (field.firstChild) {
    const child = field.firstChild as HTMLElement;
    // child.removeEventListener('click', childClickHandler);
    field.removeChild(child);
  }
  for (let i = 0; i < map.size; ++i) {
    for (let j = 0; j < map.size; ++j) {
      const cell = document.createElement("div");
      //cell.classList.add("cell");
      if(player.x === j && player.y === i){
        cell.classList.add("playerCell");
      }
      else{
        cell.classList.add("cell");
      }
      // cell.addEventListener('click', foo);
      field.append(cell);
    }
  }
  field.style.gridTemplateColumns = `repeat(${map.size}, 1fr)`;
  field.style.gridTemplateRows = `repeat(${map.size}, 1fr)`;
}

export function displayMap(map: GameMap, player: Player): void {
  const field = document.querySelector<HTMLDivElement>("#field")!;
  while (field.firstChild) {
    const child = field.firstChild as HTMLElement;
    // child.removeEventListener('click', childClickHandler);
    field.removeChild(child);
  }
  for (let i = 0; i < map.size; i++) {
    for (let j = 0; j < map.size; j++) {
      const cell = document.createElement("div");
      const gameCell = map.getCell(j, i);
      if(player.x === j && player.y === i){
        cell.classList.add("playerCell");
      }
      else if(!gameCell.hasPlant){
        cell.classList.add("cell");
      }
      else{
        if(gameCell.plantType === 1){
          cell.classList.add("plantCell1");
        }
        else if(gameCell.plantType === 2){
          cell.classList.add("plantCell2");
        }
        cell.innerHTML = gameCell.plantLevel.toString();
      }
      field.append(cell);
    }
  }
}

document.addEventListener("update", displayData);

function displayData(): void {
  const controls = document.querySelector<HTMLDivElement>("#controls")!;
  controls.querySelector("#turn-count")!.textContent = gameState.currentTurn.toString();
}
