// parse yaml into uri
const testDataUri = new URL('./testData.yaml', import.meta.url).href;

// // import yaml
import YAML from "yaml";


// Define TypeScript interfaces for clarity
interface Event {
  turn?: number;
  chance_of_rain?: number;
}

interface RepeatingEvent {
  starting_turn: number;
  every: number;
  chance_of_rain: number;
}

interface DataStructure {
  events: {
    one_time_events: Event[];
    repeating_events: RepeatingEvent[];
  };
  win_conditions: {
    point_requirement: number;
  };
}

// Function to load YAML data from file
export async function loadGameData(): Promise<DataStructure> {
  try {
    // Load and parse YAML file
    const res = await fetch(testDataUri);
    const testDataContents = await res.text();
    const fileContents = testDataContents;

    // Parse the YAML into a JavaScript 
    const parsedData = YAML.parse(fileContents) as DataStructure;

    console.log('YAML Data Loaded:', parsedData);

    // Ensure data conforms to expected format
    if (!parsedData.events || !parsedData.win_conditions) {
      throw new Error('Missing required fields in YAML file.');
    }

    return parsedData;
  } catch (error) {
    console.error('Error loading YAML file:', error);
    throw error;
  }
}

// const data = loadGameData('./gameData.yaml');
// console.log(data);