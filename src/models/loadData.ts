/*// parse yaml into uri
const testDataUri = new URL('./testData.yaml', import.meta.url).href;

// // import yaml
import YAML from "yaml";

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
*/

// Parse YAML into URI
const testDataUri = new URL('./testData.yaml', import.meta.url).href;

// Import YAML
import YAML from "yaml";

// Function to load YAML data from file
export async function loadGameData(): Promise<DataStructure> {
  try {
    // Load and parse YAML file
    const res = await fetch(testDataUri);
    const testDataContents = await res.text();
    const fileContents = testDataContents;

    // Parse the YAML into a JavaScript object
    const parsedData = YAML.parse(fileContents) as DataStructure;

    console.log('Original YAML Data Parsed:', parsedData);

    // Ensure data conforms to expected format
    if (!parsedData.events || !parsedData.win_conditions) {
      throw new Error('Missing required fields in YAML file.');
    }

    // Transform `events` field
    const transformedEvents = Object.fromEntries(
      Object.entries(parsedData.events).map(([key, value]) => {
        if (Array.isArray(value) && value.every(obj => typeof obj === "object" && obj !== null)) {
          // Flatten array of objects into a single object
          return [key, Object.assign({}, ...value)];
        } else {
          throw new Error(`Invalid event structure for event: ${key}`);
        }
      })
    );

    // Cast `transformedEvents` back to the type expected for `parsedData.events`
    parsedData.events = transformedEvents as DataStructure["events"];

    console.log('Transformed YAML Data:', parsedData);

    return parsedData;
  } catch (error) {
    console.error('Error loading YAML file:', error);
    throw error;
  }
}
