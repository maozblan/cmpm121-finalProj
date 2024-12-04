import { GameMap } from "./map.ts";
import { get, writable, type Writable } from "svelte/store";

export enum MoveDirection {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export class Player {
  x_val: Writable<number>;
  y_val: Writable<number>;
  plantType: number;

  constructor(x: number, y: number) {
    this.x_val = writable(x);
    this.y_val = writable(y);
    this.plantType = 1;
  }

  get x () {
    return get(this.x_val);
  }
  get y () {
    return get(this.y_val);
  }
  
  move(direction: MoveDirection, map: GameMap) {
    switch (direction) {
      case MoveDirection.UP:
        if (checkValidMove(this.x, this.y - 1)) {
          this.y_val.update((y) => y - 1);
        }
        break;
      case MoveDirection.DOWN:
        if (checkValidMove(this.x, this.y + 1)) {
          this.y_val.update((y) => y + 1);
        }
        break;
      case MoveDirection.LEFT:
        if (checkValidMove(this.x - 1, this.y)) {
          this.x_val.update((x) => x - 1);
        }
        break;
      case MoveDirection.RIGHT:
        if (checkValidMove(this.x + 1, this.y)) {
          this.x_val.update((x) => x + 1);
        }
        break;
    }

    function checkValidMove(x: number, y: number) {
      return x >= 0 && x < map.size && y >= 0 && y < map.size;
    }
  }
}
