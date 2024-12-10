import { writable, type Writable } from "svelte/store";
import { MoveDirection } from "../models/player.ts";

export const movementDuration: number = 0.7; // in seconds
export const playerFrame: Writable<Frame> = writable({ x: 0, y: 0 });
const buffer: number = 0.1; // in seconds
const FPS: number = 3;
export let currentAnimation: number | null = null;

interface Frame {
  x: number;
  y: number;
}

const movementFrames = new Map<MoveDirection, Frame[]>([
  [MoveDirection.UP, [
    { x: 1, y: 3 },
    { x: 2, y: 3 }
  ]],
  [MoveDirection.DOWN, [
    { x: 1, y: 0 },
    { x: 2, y: 0 }
  ]],
  [MoveDirection.LEFT, [
    { x: 1, y: 2 },
    { x: 2, y: 2 }
  ]],
  [MoveDirection.RIGHT, [
    { x: 1, y: 1 },
    { x: 2, y: 1 }
  ]],
]);

const idleFrames = new Map<MoveDirection, Frame>([
  [MoveDirection.UP, { x: 0, y: 3 }],
  [MoveDirection.DOWN, { x: 0, y: 0 }],
  [MoveDirection.LEFT, { x: 0, y: 2 }],
  [MoveDirection.RIGHT, { x: 0, y: 1 }]
]);

export function animateMove(direction: MoveDirection): void {
  // uncomment and change controller.ts to enable drifting lol
  // if (currentAnimation !== null) {
  //   clearInterval(currentAnimation);
  // }

  let currentFrame = 0; 
  // trigger immediately
  playerFrame.set(movementFrames.get(direction)![++currentFrame % movementFrames.get(direction)!.length]);
  // set interval for animation
  currentAnimation = setInterval(() => {
    playerFrame.set(movementFrames.get(direction)![++currentFrame % movementFrames.get(direction)!.length]);
  }, 1000 / FPS);

  // stop animation when player reaches destination
  setTimeout(() => {
    if (currentAnimation === null) return;

    clearInterval(currentAnimation);
    currentAnimation = null;
    setFrame(direction);
  }, (movementDuration - buffer) * 1000);
}

function setFrame(direction: MoveDirection): void {
  playerFrame.set(idleFrames.get(direction)!);
}
