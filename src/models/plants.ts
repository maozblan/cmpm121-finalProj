import { GameMap, Cell } from "./map.ts";
import { PlantInfo } from "./PlantInfo.ts";

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
      // do nothing
    }
  }

  grow(map: GameMap) {
    const thisCell = map.getCell(this.x, this.y);
    const thisInfo = PlantInfo[this.plantType];

    // grow conditions
    if (
      checkPlantCondition(this.x, this.y, thisCell, thisInfo.growConditions)
    ) {
      // increase level
      if (Math.random() < thisInfo.growConditions.chance) {
        try {
          if (thisCell.plantLevel != thisInfo.maxLevel) {
            thisCell.plantLevel++;
          }
        } catch {
          // do nothing
        }
      }
    }

    // decay conditions
    if (
      !checkPlantCondition(this.x, this.y, thisCell, thisInfo.decayConditions)
    ) {
      // decrease level
      if (Math.random() < thisInfo.decayConditions.chance) {
        try {
          if (thisCell.plantLevel === 1) {
            map.reapPlant(this.x, this.y);
          } else {
            thisCell.plantLevel--;
          }
        } catch {
          // do nothing
        }
      }
    }

    // expand conditions
    if (thisCell.plantLevel >= thisInfo.expandLevel) {
      for (const [x, y] of getSurroundingCells(this.x, this.y)) {
        try {
          if (
            checkPlantCondition(
              x,
              y,
              thisCell,
              thisInfo.expandConditions
            )
          ) {
            this._tryPlace(map, x, y, this.plantType, 1);
          }
        } catch {
          // do nothing
        }
      }
    }

    function checkPlantCondition(
      x: number,
      y: number,
      cell: Cell,
      condition: PlantConditions
    ) {
      // check water and sun levels
      if (condition.water && cell.waterLevel < condition.water) {
        return false;
      }
      if (condition.sun && cell.sunLevel < condition.sun) {
        return false;
      }

      // check neighbor conditions
      const neighbors = getNeighborPlants(x, y, map);
      if (condition.minNeighbors) {
        if (
          getNumOfType(neighbors, PlantInfo[cell.plantType].friendlyNeighbors) <
          condition.minNeighbors
        ) {
          return false;
        }
      }
      if (condition.maxNeighbors) {
        if (
          getNumOfType(neighbors, PlantInfo[cell.plantType].friendlyNeighbors) >
          condition.maxNeighbors
        ) {
          return false;
        }
      }
      if (condition.tolerance) {
        if (
          getNumOfType(neighbors, PlantInfo[cell.plantType].enemyNeighbors) >
          condition.tolerance
        ) {
          return false;
        }
      }
      return true;
    }
  }

  getColor() {
    return PlantInfo[this.plantType].color;
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

function getNeighborPlants(x: number, y: number, map: GameMap) {
  const neighbors = [];
  for (const [nx, ny] of getSurroundingCells(x, y)) {
    try {
      const cell = map.getCell(nx, ny);
      if (cell.hasPlant) {
        neighbors.push(cell.plantType);
      }
    } catch {
      // do nothing
    }
  }
  return neighbors;
}

function getNumOfType(neighbors: number[], types: number[]) {
  return neighbors.filter((n) => types.includes(n)).length;
}
