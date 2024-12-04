// Parse YAML into URI
const testDataUri = new URL("./testData.yaml", import.meta.url).href;
import YAML from "yaml";

export async function loadGameData(): Promise<DataStructure> {
  try {
    // Load and parse YAML file
    const res = await fetch(testDataUri);
    const testDataContents = await res.text();
    const fileContents = testDataContents;

    // Parse the YAML into a JavaScript object
    const parsedData = YAML.parse(fileContents) as DataStructure;

    // Ensure data conforms to expected format
    if (!parsedData.events || !parsedData.win_conditions) {
      throw new Error("Missing required fields in YAML file.");
    }

    // Transform `events` field
    const transformedEvents = Object.fromEntries(
      Object.entries(parsedData.events).map(([key, value]) => {
        if (
          Array.isArray(value) &&
          value.every((obj) => typeof obj === "object" && obj !== null)
        ) {
          // Flatten array of objects into a single object
          return [key, Object.assign({}, ...value)];
        } else {
          throw new Error(`Invalid event structure for event: ${key}`);
        }
      })
    );

    // Cast `transformedEvents` back to the type expected for `parsedData.events`
    parsedData.events = transformedEvents as DataStructure["events"];
    return parsedData;
  } catch (error) {
    console.error("Error loading YAML file:", error);
    throw error;
  }
}
