// // // parse yaml into json objects
// //import * as fs from 'node:fs';
// //import testDataContents from "./testData.yaml";
// const testDataUri = new URL('./testData.yaml', import.meta.url).href;

// // // import {parse} from 'jsr:@std/yaml';
// import YAML from "yaml";


// // Define TypeScript interfaces for clarity
// interface Event {
//   turn?: number;
//   chance_of_rain?: number;
// }

// interface RepeatingEvent {
//   starting_turn: number;
//   every: number;
//   chance_of_rain: number;
// }

// interface DataStructure {
//   events: {
//     one_time_events: Event[];
//     repeating_events: RepeatingEvent[];
//   };
//   win_conditions: {
//     point_requirement: number;
//   };
// }

// // Function to load YAML data from file
// export function loadGameData(filePath: string): DataStructure {
//   try {
//     // Load and parse YAML file
//     const fileContents = fs.readFileSync(filePath, 'utf8');
//     const parsedData = yaml.load(fileContents) as DataStructure;

//     console.log('YAML Data Loaded:', parsedData);

//     // Ensure data conforms to expected format
//     if (!parsedData.events || !parsedData.win_conditions) {
//       throw new Error('Missing required fields in YAML file.');
//     }

//     return parsedData;
//   } catch (error) {
//     console.error('Error loading YAML file:', error);
//     throw error;
//   }
// }

// // const data = loadGameData('./gameData.yaml');
// // console.log(data);