// // parse yaml into json objects
// import * as fs from 'node:fs';
// // import {parse} from 'jsr:@std/yaml';
// import YAML from "yaml";


// interface PlantCollection {
//     plants: {
//       [key: string]: PlantInfo;
//     };
// }

// // Function to load and parse the YAML file
// function loadPlantData(filePath: string): PlantCollection | null {
//     try {
//       // Read the YAML file
//       const fileContents = fs.readFileSync(filePath, 'utf8');

//       // Parse the YAML into a JavaScript object
//       const parsedData = YAML.parse(fileContents)// as PlantCollection;
//       console.log(parsedData);
  
//       // Validate data structure (optional, good for debugging)
//       // if (!parsedData || !parsedData.plants) {
//       //   throw new Error('Invalid data structure in YAML file');
//       // }
  
//       // return parsedData;
//     } catch (error) {
//       console.error(`Error loading YAML file`, error);
//       return null;
//     }
//     return null;
// }

// export { loadPlantData };