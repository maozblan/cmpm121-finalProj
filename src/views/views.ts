import { GameMap } from "../models/map.ts";
import { Player } from "../models/player.ts";
import { chanceOfRain, gameState, getCurrentMap, player } from "../game.ts";
import { PlantInfo } from "../models/PlantInfo.ts";

export function createMap(map: GameMap): void {
  const field = document.querySelector<HTMLDivElement>("#field")!;
  while (field.firstChild) {
    const child = field.firstChild as HTMLElement;
    field.removeChild(child);
  }
  for (let i = 0; i < map.size; ++i) {
    for (let j = 0; j < map.size; ++j) {
      const cell = document.createElement("div");
      if (player.x === j && player.y === i) {
        cell.classList.add("playerCell");
      } else {
        cell.classList.add("cell");
      }
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
    field.removeChild(child);
  }
  for (let i = 0; i < map.size; i++) {
    for (let j = 0; j < map.size; j++) {
      const cell = document.createElement("div");
      const gameCell = map.getCell(j, i);
      if (player.x === j && player.y === i) {
        cell.classList.add("playerCell");
      } else if (!gameCell.hasPlant) {
        cell.classList.add("cell");
      } else {
        cell.classList.add("plantCell1");
        cell.style.backgroundColor = PlantInfo[gameCell.plantType].color;
        cell.innerHTML = gameCell.plantLevel.toString();
      }
      field.append(cell);
    }
  }
}

function displayData(): void {
  const controls = document.querySelector<HTMLDivElement>("#controls")!;
  controls.querySelector("#turn-count")!.textContent =
    gameState.currentTurn.toString();
  const eventAnnouncement = document.querySelector<HTMLDivElement>("#event")!;
  if (chanceOfRain > 0) {
    eventAnnouncement.textContent = `Chance of rain ${chanceOfRain * 100}%`;
  } else {
    eventAnnouncement.textContent = "no rain this turn...";
  }
}

document.addEventListener("update-visuals", () => {
  displayData();
  displayMap(getCurrentMap(), player);
});
