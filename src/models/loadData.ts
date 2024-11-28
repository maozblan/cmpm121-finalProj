// // parse yaml into json objects
//import * as fs from 'node:fs';
//import testDataContents from "./testData.yaml";
const testDataUri = new URL('./testData.yaml', import.meta.url).href;

// // import {parse} from 'jsr:@std/yaml';
import YAML from "yaml";


interface PlantCollection {
    plants: {
      [key: string]: PlantInfo;
    };
}

// Function to load and parse the YAML file
async function loadPlantData(): Promise<PlantCollection> {
    try {
      // Read the YAML file
      const res = await fetch(testDataUri);
      const testDataContents = await res.text();
      const fileContents = testDataContents;

      // Parse the YAML into a JavaScript object
      const parsedData = YAML.parse(fileContents) as PlantCollection;
      console.log(parsedData);
  
      //Validate data structure (optional, good for debugging)
      if (!parsedData || !parsedData.plants) {
        throw new Error('Invalid data structure in YAML file');
      }
  
      return parsedData;
    } catch (error) {
      console.error(`Error loading YAML file`, error);
      return {plants: {}};
    }
}

export { loadPlantData };