export const plantInfo: PlantInfo[] = [
  {
    // grow fast, expand fast, low max level
    name: "Grass",
    imgUrl: "",
    maxLevel: 3,
    expandLevel: 2,
    waterConsumption: 1,
    expandConditions: {
      water: 3,
      sun: 3,
      chance: 0.8,
      tolerance: 2
    },
    growConditions: {
      water: 2,
      sun: 2,
      minNeighbors: 1,
    },
    decayConditions: {
      booleanLogic: "or",
      water: 1,
      tolerance: 3
    },
    friendlyNeighbors: [0],
    enemyNeighbors: [1],
    color: "rgb(12, 144, 0)"
  },
  {
    // grow fast, low level, expand fast
    name: "Flower",
    imgUrl: "",    
    maxLevel: 5,
    expandLevel: 3,
    waterConsumption: 1,
    expandConditions: {
      water: 2,
      sun: 7,
      chance: 0.9,
      tolerance: 3
    },
    growConditions: {
      water: 2,
      sun: 2,
      minNeighbors: 1,
    },
    decayConditions: {
      water: 1,
      booleanLogic: "or",
      sun: 3,
      minNeighbors: 0,
    },
    friendlyNeighbors: [0],
    enemyNeighbors: [1],
    color: "rgb(229, 162, 56)"
  },
  {
    // grow slowly, expand slowly, resilient
    name: "Moss",
    imgUrl: "",
    maxLevel: 10,
    expandLevel: 7,
    waterConsumption: 1,
    expandConditions: {
      water: 4,
      sun: 4,
      chance: 0.2,
      tolerance: 1
    },
    growConditions: {
      water: 3,
      sun: 3,
      minNeighbors: 3,
      chance: 0.5
    },
    decayConditions: {
      water: 1,
      sun: 1,
      tolerance: 2
    },
    friendlyNeighbors: [2],
    enemyNeighbors: [0, 1],
    color: "rgb(15, 71, 4)"
  },
  {
    // (intended to grow quickly in a line) maybe WIP
    name: "Vines",
    imgUrl: "",
    maxLevel: 4,
    expandLevel: 1,
    waterConsumption: 3,
    growConditions:
    {
      water: 2,
      sun: 2,
      minNeighbors: 1,
      chance: 0.8
    },
    expandConditions:
    {
      water: 6,
      sun: 4,
      tolerance: 2
    },
    decayConditions:
    {
      water: 5,
      sun: 4,
      tolerance: 2
    },
    friendlyNeighbors: [3],
    enemyNeighbors: [0, 1, 2],
    color: "rgb(10, 145, 95)"
  },
  {
    // intended to grow fast and be obstical for others
    name: "Weeds",
    imgUrl: "",
    maxLevel: 2,
    expandLevel: 1,
    waterConsumption: 4,
    growConditions:
    {
      water: 4,
      sun: 8,
      minNeighbors: 1,
      chance: 0.8
    },
    expandConditions:
    {
      water: 1,
      sun: 1,
      chance: 0.7,
      minNeighbors: 1,
    },
    decayConditions:
    {
      water: 2,
      sun: 2,
      minNeighbors: 1,
    },
    friendlyNeighbors: [0, 1, 2],
    enemyNeighbors: [3, 4],
    color: "rgb(112, 79, 47)"
  }
];