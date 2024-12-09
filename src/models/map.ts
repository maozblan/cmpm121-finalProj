import { Plant } from "./plants.ts";
import { PlantInfo } from "./PlantInfo.ts";
import { chanceOfRain, gameData } from "../controllers/game.ts";
import { get } from "svelte/store";

const CELL_SIZE = 6; // in bytes
export class Cell {
  constructor(private dataView: DataView) {}

  get waterLevel() {
    return this.dataView.getUint16(0);
  }
  set waterLevel(value: number) {
    if (value > 65535 || value < 0) throw "Excessive Water Level";
    if (value >= MAX_WATER) value = MAX_WATER;
    this.dataView.setInt16(0, value);
  }
  get sunLevel() {
    return this.dataView.getUint16(2);
  }
  set sunLevel(value: number) {
    if (value > 65535 || value < 0) throw "Excessive Sun Level";
    this.dataView.setInt16(2, value);
  }
  get plantType() {
    return this.dataView.getUint8(4);
  }
  set plantType(value: number) {
    if (value > 255 || value < 0) throw "Excessive Plant Type";
    this.dataView.setInt8(4, value);
  }
  get plantLevel() {
    return this.dataView.getUint8(5);
  }
  set plantLevel(value: number) {
    if (value > 255 || value < 0) throw "Excessive Plant Level";
    this.dataView.setUint8(5, value);
  }
  get hasPlant() {
    return this.dataView.getUint16(4) != 0;
  }
}

const SUN_CEIL = 10;
const SUN_FLOOR = 2;
const WATER_CEIL = 5;
const WATER_FLOOR = 0;
const MAX_WATER = 25;
export class GameMap {
  private cells: Array<Array<Cell>>;
  private buffer: ArrayBuffer;
  size: number;

  constructor(size: number) {
    this.size = size;
    this.cells = new Array(size);
    this.buffer = new ArrayBuffer(size * size * CELL_SIZE);
    for (let i = 0; i < size; i++) {
      this.cells[i] = new Array(size);
      for (let j = 0; j < size; j++) {
        this.cells[i][j] = new Cell(
          new DataView(
            this.buffer,
            i * size * CELL_SIZE + j * CELL_SIZE,
            CELL_SIZE
          )
        );

        // setting initial water/sun levels (water doubled)
        this.cells[i][j].sunLevel = this.randomInt(SUN_FLOOR, SUN_CEIL);
        this.cells[i][j].waterLevel = this.randomInt(WATER_FLOOR, WATER_CEIL);
        this.cells[i][j].waterLevel += this.randomInt(WATER_FLOOR, WATER_CEIL);
      }
    }
  }

  getBuffer() {
    return this.buffer;
  }
  exportBuffer() {
    return this.buffer.slice(0);
  }
  loadBuffer(buffer: ArrayBuffer) {
    this.buffer = buffer;
    for (let i = 0; i < this.size; i++) {
      this.cells[i] = new Array(this.size);
      for (let j = 0; j < this.size; j++) {
        this.cells[i][j] = new Cell(
          new DataView(
            this.buffer,
            i * this.size * CELL_SIZE + j * CELL_SIZE,
            CELL_SIZE
          )
        );
      }
    }
  }

  copy(): GameMap {
    const newMap = new GameMap(this.size);
    newMap.loadBuffer(this.exportBuffer());
    return newMap;
  }

  nextTurn(): GameMap {
    const newMap = this.copy();

    //update the plants into the next turn in the new map
    this.loopCells((cell, x, y) => {
      if (cell.hasPlant) {
        this.updatePlant(x, y, newMap);
        //reduce the new map's water by if has plant
        try {
          newMap.getCell(x, y).waterLevel -=
            PlantInfo[cell.plantType].waterConsumption;
        } catch {
          newMap.getCell(x, y).waterLevel = 0;
        }
      }
    });

    //update the next maps water/sun levels
    try {
      if (chanceOfRain && Math.random() <= get(chanceOfRain)) {
        newMap.updateWaterLevels();
      }
    } catch {
      console.error("Error updating water levels");
    }
    try {
      newMap.updateSun();
    } catch {
      console.error("Error updating sun levels");
    }
    return newMap;
  }

  // game functions ///////////////////////////////////////////////////////////

  getCell(x: number, y: number): Cell {
    this.checkBounds(x, y);
    return this.cells[x][y];
  }

  getScore(): number {
    let score = 0;
    this.loopCells((cell) => {
      if (cell.hasPlant) {
        score += PlantInfo[cell.plantType].scoreMultiplier * cell.plantLevel;
      }
    });
    return score;
  }

  placePlantOnCopy(
    x: number,
    y: number,
    plantType: number,
    plantLevel: number = 1
  ): GameMap | null {
    const newMap = this.copy();
    this.checkBounds(x, y);
    if (this.getCell(x, y).hasPlant) {
      return null;
    }
    newMap.getCell(x, y).plantType = plantType;
    newMap.getCell(x, y).plantLevel = plantLevel;
    return newMap;
  }

  reapPlantOnCopy(x: number, y: number): GameMap | null {
    const newMap = this.copy();
    this.checkBounds(x, y);
    if (!this.getCell(x, y).hasPlant) {
      return null;
    }
    newMap.getCell(x, y).plantType = 0;
    newMap.getCell(x, y).plantLevel = 0;
    return newMap;
  }

  placePlant(x: number, y: number, plantType: number, plantLevel: number = 1) {
    this.checkBounds(x, y);
    if (this.getCell(x, y).hasPlant) {
      return;
    }
    this.getCell(x, y).plantType = plantType;
    this.getCell(x, y).plantLevel = plantLevel;
  }

  reapPlant(x: number, y: number) {
    this.checkBounds(x, y);
    if (!this.getCell(x, y).hasPlant) {
      return;
    }
    this.getCell(x, y).plantType = 0;
    this.getCell(x, y).plantLevel = 0;
  }

  // internal functions ///////////////////////////////////////////////////////

  updatePlant(x: number, y: number, newMap: GameMap) {
    this.checkBounds(x, y);
    if (!this.getCell(x, y).hasPlant) {
      return;
    }
    if (this.getCell(x, y).waterLevel < 1) {
      this.reapPlant(x, y);
      newMap.reapPlant(x, y);
      return;
    }
    const plant = new Plant(
      this.getCell(x, y).plantType,
      this.getCell(x, y).plantLevel,
      x,
      y
    );
    plant.grow(this, newMap);
  }

  updateWaterLevels() {
    this.loopCells((cell) => {
      cell.waterLevel += this.randomInt(WATER_FLOOR, WATER_CEIL);
    });
  }

  updateSun() {
    this.loopCells((cell) => {
      cell.sunLevel = this.randomInt(SUN_FLOOR, SUN_CEIL);
    });
  }

  // utility functions ////////////////////////////////////////////////////////

  loopCells(callback: (cell: Cell, x: number, y: number) => void) {
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells.length; j++) {
        callback(this.cells[i][j], i, j);
      }
    }
  }

  checkCells() {
    this.loopCells((cell, x, y) => {
      console.log(`Cell at (${x}, ${y}) has 
				water level ${cell.waterLevel}, 
				sun level ${cell.sunLevel}, 
				plant type ${cell.plantType}, 
				plant level ${cell.plantLevel}`);
    });
  }

  checkBounds(x: number, y: number) {
    if (x < 0 || y < 0 || x >= this.cells.length || y >= this.cells.length) {
      throw "Out of Bounds";
    }
  }

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // win condition ////////////////////////////////////////////////////////////
  playScenarioCompleted() {
    return this.getScore() > gameData!.win_conditions.point_requirement;
  }
}
