import { GameMap } from "./map.ts";
import { plantInfo } from "./plantTypes.ts";


export class Plant {
  plantType: number;
  plantLevel: number;
  x: number;
  y: number;
  constructor(plantType: number, plantLevel: number, x: number, y: number) {
    this.plantType = plantType;
    this.plantLevel = plantLevel;
    this.x = x;
    this.y = y;
  }
  _tryPlace(map: GameMap, x: number, y: number, type: number, level: number) {
    try {
      map.placePlant(x, y, type, level);
    } catch {
      console.error("Error planting plant");
    }
  }
  grow(map: GameMap, newMap: GameMap) {
    for (const [x, y] of getSurroundingCells(this.x, this.y)) {
      try {
        const cell = map.getCell(x, y);
        if (cell.waterLevel > plantInfo[this.plantType].waterEx && cell.sunLevel > plantInfo[this.plantType].sunEx) {
          this._tryPlace(newMap, x, y, this.plantType, this.plantLevel);
        }
      } catch {
        console.error("Error growing plant to neighbor");
      }
    }
    try {
      const tmpCell = map.getCell(this.x, this.y);
      if (tmpCell.waterLevel > plantInfo[this.plantType].waterSelf && tmpCell.sunLevel > plantInfo[this.plantType].sunSelf) {
        newMap.getCell(this.x, this.y).plantLevel = tmpCell.plantLevel + 1;
      }
    } catch {
      console.error("Error raising plant level");
    }
  }
  getColor() {
    return plantInfo[this.plantType].color;
  }
}



function getSurroundingCells(x: number, y: number) {
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];
}
