// PLANT DSL
// enter new plants into PlantInfo array to create them.

// ==== PlantInfo Interface ====
/*
    name: string;
    imgUrl: string;
    maxLevel: number; // inclusive
    scoreMultiplier: number; // multiplied by plant level for each plant's score
    expandLevel: number; // level at which plant can expand
    waterConsumption: number; // amount of water consumed per turn
    expandConditions: PlantConditions;
    growConditions: PlantConditions;
    decayConditions: PlantConditions; 
    color: string; // for ui
    friendlyNeighbors: Array<number>; // plant types that are counted for min/max neighbors
    enemyNeighbors: Array<number>; // plant types which are considered by tolerance
*/
// NOTE: plant conditions define values that must be met to grow/expand/decay.
// min and max neighbors checks for decided friendly neighbors.
// enemy neighbors is only used for tolerance, allowing different treatment of
// neighbors and dangerous plants.
// plant conditions are inversed for decay, so falling short of any threshold means decay.

export const PlantInfo: PlantInfo[] = [
  {
    // grow fast, expand fast, low max level
    name: "Grass",
    imgUrl: "",
    maxLevel: 3,
    expandLevel: 2,
    waterConsumption: 1,
    scoreMultiplier: 1,
    expandConditions: {
      water: 5,
      sun: 4,
      chance: 0.8,
      tolerance: 2,
      minNeighbors: 1,
    },
    growConditions: {
      water: 2,
      sun: 2,
      chance: 1,
    },
    decayConditions: {
      water: 5,
      sun: 5,
      chance: 1,
      maxNeighbors: 3,
    },
    friendlyNeighbors: [0],
    enemyNeighbors: [1, 3],
    color: "rgb(12, 144, 0)",
  },
  {
    // grow fast, expand fast, weak to other plants
    name: "Flower",
    imgUrl: "",
    maxLevel: 5,
    expandLevel: 3,
    waterConsumption: 1,
    scoreMultiplier: 2,
    expandConditions: {
      water: 4,
      sun: 6,
      chance: 0.9,
      tolerance: 3,
    },
    growConditions: {
      water: 4,
      sun: 5,
      chance: 0.8,
    },
    decayConditions: {
      water: 2,
      chance: 1,
      sun: 3,
      tolerance: 1,
    },
    friendlyNeighbors: [0, 1],
    enemyNeighbors: [0, 2, 3],
    color: "rgb(229, 162, 56)",
  },
  {
    // grow slowly, expand slowly, resilient, grows in clumps
    name: "Moss",
    imgUrl: "",
    maxLevel: 10,
    expandLevel: 7,
    waterConsumption: 1,
    scoreMultiplier: 1,
    expandConditions: {
      water: 4,
      sun: 4,
      chance: 0.2,
      tolerance: 1,
      minNeighbors: 2,
    },
    growConditions: {
      water: 3,
      sun: 3,
      minNeighbors: 2,
      chance: 0.5,
    },
    decayConditions: {
      water: 1,
      sun: 1,
      chance: 1,
      tolerance: 2,
    },
    friendlyNeighbors: [2],
    enemyNeighbors: [0, 1, 3],
    color: "rgb(15, 71, 4)",
  },
  {
    // grows fast, eats other plants
    name: "Weeds",
    imgUrl: "",
    maxLevel: 2,
    expandLevel: 1,
    waterConsumption: 4,
    scoreMultiplier: 1,
    growConditions: {
      water: 8,
      sun: 8,
      minNeighbors: 1,
      chance: 0.8,
    },
    expandConditions: {
      water: 1,
      sun: 1,
      chance: 0.7,
      minNeighbors: 1,
    },
    decayConditions: {
      water: 5,
      sun: 5,
      chance: 1,
      tolerance: 2,
    },
    friendlyNeighbors: [0, 1, 2],
    enemyNeighbors: [3],
    color: "rgb(112, 79, 47)",
  },
];
