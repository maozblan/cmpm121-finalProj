import { GameMap } from "./map.ts";
export class Player{
    x: number;
    y: number;
    plantType: number;
    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
        this.plantType = 1;
    }
    move(direction: string, map: GameMap){
        let newX = this.x;
        let newY = this.y;

        switch(direction){
            case "up":
                newY -= 1;
                break;
            case "down":
                newY += 1;
                break;
            case "left":
                newX -= 1;
                break;
            case "right":
                newX += 1;
                break;
        }

        try {
            map.checkBounds(newX, newY);
            this.x = newX;
            this.y = newY;
        }
        catch{}
    }
}