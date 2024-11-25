import { GameMap } from "../models/map.ts";

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
      cell.classList.add("cell");
      // cell.addEventListener('click', foo);
      field.append(cell);
    }
  }
  field.style.gridTemplateColumns = `repeat(${map.size}, 1fr)`;
  field.style.gridTemplateRows = `repeat(${map.size}, 1fr)`;
}

export function displayMap(map: GameMap): void {
  const field = document.querySelector<HTMLDivElement>("#field")!;
  for (let i = 0; i < map.size; i++) {
    for (let j = 0; j < map.size; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      field.append(cell);
    }
  }
}
