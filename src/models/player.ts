import { GameMap } from "./map.ts";

export enum MoveDirection{
    UP,
    DOWN,
    LEFT,
    RIGHT
}
export class Player{
    x: number;
    y: number;
    plantType: number;
    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
        this.plantType = 1;
    }
    move(direction:MoveDirection, map: GameMap){
        switch(direction){
            case MoveDirection.UP:
                if (checkValidMove(this.x, this.y - 1)) this.y -= 1;
                break;
            case MoveDirection.DOWN:
                if (checkValidMove(this.x, this.y + 1)) this.y += 1;
                break;
            case MoveDirection.LEFT:
                if (checkValidMove(this.x - 1, this.y - 1)) this.x -= 1;
                break;
            case MoveDirection.RIGHT:
                if (checkValidMove(this.x + 1, this.y)) this.x += 1;
                break;
        }

        function checkValidMove(x:number, y:number) {
            return x >= 0 && x < map.size && y >= 0 && y < map.size;
        }
    }
}