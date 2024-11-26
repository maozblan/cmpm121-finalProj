const CELL_SIZE = 6;
class Cell {
	constructor(private dataView: DataView) {}

	get waterLevel() {
		return this.dataView.getUint16(0);
	}
	set waterLevel(value: number) {
		if (value > 65535 || value < 0) throw("Excessive Water Level")
		this.dataView.setInt16(0, value);
	}
	get sunLevel() {
		return this.dataView.getUint16(2);
	}
	set sunLevel(value: number) {
		if (value > 65535 || value < 0) throw("Excessive Sun Level")
		this.dataView.setInt16(2, value);
	}
	get plantType() {
		return this.dataView.getUint8(4);
	}
	set plantType(value: number) {
		if (value > 255 || value < 0) throw("Excessive Plant Type")
		this.dataView.setInt8(4, value);
	}
	get plantLevel() {
		return this.dataView.getUint8(5);
	}
	set plantLevel(value: number) {
		if (value > 255 || value < 0) throw("Excessive Plant Level")
		this.dataView.setUint8(5, value);
	}
	get hasPlant() {
		return this.dataView.getUint16(4) != 0;
	}
}

export class GameMap {
	private cells: Array<Array<Cell>>;
	private buffer: ArrayBuffer;
	size:number;

	constructor(size:number) {
		this.size = size;
		this.cells = new Array(size);
		this.buffer = new ArrayBuffer(size * size * CELL_SIZE);
		for (let i = 0; i < size; i++) {
			this.cells[i] = new Array(size);
			for (let j = 0; j < size; j++) {
				this.cells[i][j] = new Cell(new DataView(this.buffer, i * size * CELL_SIZE + j * CELL_SIZE, CELL_SIZE));
				this.cells[i][j].waterLevel = this.randomInt(2, 7);
				this.cells[i][j].sunLevel = this.randomInt(2, 7);
			}
		}
	}
	exportBuffer() {
		return this.buffer;
	}
	loadBuffer(buffer: ArrayBuffer) { 
		this.buffer = buffer;
		for (let i = 0; i < this.size; i++) {
			this.cells[i] = new Array(this.size);
			for (let j = 0; j < this.size; j++) {
				this.cells[i][j] = new Cell(new DataView(this.buffer, i * this.size * CELL_SIZE + j * CELL_SIZE, CELL_SIZE));
			}
		}
	}

	nextTurn() {
		this.loopCells((cell, x, y) => {
			if (cell.hasPlant) {
				this.growPlant(x, y);
				cell.waterLevel -= 1;
			}
			// updateWaterLevels();
			// updateSun();
		});
	}

	getCell(x:number, y:number) {
		this.checkBounds(x, y);
		return this.cells[x][y];
	}

	placePlant(x:number, y:number, plantType:number, plantLevel:number = 1) {
		this.checkBounds(x, y);
		if (this.getCell(x, y).hasPlant) {
			console.log("Cell already has a plant");
			return;
		}
		this.getCell(x, y).plantType = plantType;
		this.getCell(x, y).plantLevel = plantLevel;
	}

	reapPlant(x:number, y:number) {
		this.checkBounds(x, y);
		if (!this.getCell(x, y).hasPlant) {
			console.log("Cell does not have a plant");
			return;
		}
		this.getCell(x, y).plantType = 0;
		this.getCell(x, y).plantLevel = 0;
	}

	growPlant(x:number, y:number) {
		this.checkBounds(x, y);
		if (!this.getCell(x, y).hasPlant) {
			console.log("Cell does not have a plant");
			return;
		}
		if (this.getCell(x, y).waterLevel < 1) {
			console.log("Not enough water to grow plant at cell (" + x + ", " + y + ")");
			this.reapPlant(x, y);
			return;
		}
		// let plant = new Plant(this.getCell(x, y).plantType, this.getCell(x, y).plantLevel);
		// plant.grow(); // this should be able to directly update plant level in map
	}

	updateWaterLevels() {
		this.loopCells((cell, _x, _y) => {
			cell.waterLevel += this.randomInt(0,2);
		});
	}

	updateSun() {
		this.loopCells((cell, _x, _y) => {
			cell.sunLevel = this.randomInt(0, 6);
		});
	}

	// utility functions
	loopCells(callback: (cell: Cell, x: number, y: number) => void) {
		for (let i = 0; i < this.cells.length; i++) {
			for (let j = 0; j < this.cells.length; j++) {
				callback(this.cells[i][j], i, j);
			}
		}
	}

	checkCells() {
		this.loopCells((cell, x, y) => {
			console.log(`Cell at (${x}, ${y}) has water level ${cell.waterLevel}, sun level ${cell.sunLevel}, plant type ${cell.plantType}, plant level ${cell.plantLevel}`);
		});
	}

	checkBounds(x:number, y:number) {
		if (x < 0 || y < 0 || x >= this.cells.length || y >= this.cells.length) throw("Out of Bounds");
	}

	randomInt(min:number, max:number) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}