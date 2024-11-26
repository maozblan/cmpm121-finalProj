import { GameMap } from "./map.ts";
export class Plant{
    plantType: number;
    plantLevel: number;
    x: number;
    y: number;
    constructor(plantType: number, plantLevel: number, x: number, y: number){
        this.plantType = plantType;
        this.plantLevel = plantLevel;
        this.x = x;
        this.y = y;
    }
    _tryPlace(map: GameMap, x: number, y: number, type: number, level: number){
        try{
            map.placePlant(x, y, type, level);
        }
        catch{}
    }
    grow(map: GameMap, newMap: GameMap){
        console.log("plant grow");
        switch (this.plantType){
            case 1:
                for(let i = 0; i < 4; i++){
                    let x = this.x;
                    let y = this.y;
                    switch(i){
                        case 0:
                            x--;
                            break;
                        case 1:
                            x++;
                            break;
                        case 2:
                            y--;
                            break;
                        case 3:
                            y++;
                            break;
                    }
                    try {
                        let cell = map.getCell(x, y);
                        if(cell.waterLevel > 5 && cell.sunLevel > 4){
                            this._tryPlace(newMap, x, y, this.plantType, this.plantLevel);
                        }
                    }
                    catch{}
                    try {
                        const tmpCell = map.getCell(this.x, this.y);
                        if(tmpCell.waterLevel > 2 && tmpCell.sunLevel > 2){
                            newMap.getCell(this.x, this.y).plantLevel = tmpCell.plantLevel + 1;
                        }
                    }
                    catch{}
                }
                break;
            case 2:
                for(let i = 0; i < 4; i++){
                    let x = this.x;
                    let y = this.y;
                    switch(i){
                        case 0:
                            x--;
                            break;
                        case 1:
                            x++;
                            break;
                        case 2:
                            y--;
                            break;
                        case 3:
                            y++;
                            break;
                    }
                    try {
                        let cell = map.getCell(x, y);
                        if(cell.waterLevel > 7 && cell.sunLevel > 5){
                            this._tryPlace(newMap, x, y, this.plantType, this.plantLevel);
                        }
                    }
                    catch{}
                    try {
                        const tmpCell = map.getCell(this.x, this.y);
                        if(tmpCell.waterLevel > 2 && tmpCell.sunLevel > 2){
                            newMap.getCell(this.x, this.y).plantLevel = tmpCell.plantLevel + 1;
                        }
                    }
                    catch{}
                }
                break;
        }
    }
}