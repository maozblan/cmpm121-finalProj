declare module "*.png" {
  const value: string;
  export default value;
}

// for internal DSL
interface PlantInfo {
  name: string;
  imgs: string[]; // for ui
  maxLevel: number; // inclusive
  scoreMultiplier: number;
  expandLevel: number; // level at which plant can expand
  waterConsumption: number;
  expandConditions: PlantConditions;
  growConditions: PlantConditions;
  decayConditions: PlantConditions;
  // note about decay conditions, water and sun are inversed, so falling short of threshold means decay.
  // neighbors checks for number of enemy neighbors. if condition is met, plant decays.
  color: string; // for ui
  friendlyNeighbors: Array<number>; // plant types that are counted as positive neighbors
  enemyNeighbors: Array<number>; // plant types that are counted as negative neighbors
}

interface PlantConditions {
  water?: number;
  sun?: number;
  chance: number;
  minNeighbors?: number;
  maxNeighbors?: number;
  tolerance?: number; // how many opponent plants can be tolerated
}

// for external DSL
interface Event {
  turn: number;
  chance_of_rain: number;
}

interface RepeatingEvent {
  starting_turn: number;
  every: number;
  chance_of_rain: number;
}

interface DataStructure {
  events: {
    one_time_event: Event;
    repeating_event: RepeatingEvent;
  };
  win_conditions: {
    point_requirement: number;
  };
}
