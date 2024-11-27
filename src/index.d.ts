declare module '*.png' {
  const value: string;
  export default value;
}

interface PlantInfo {
  name: string;
  imgUrl: string; // for ui
  waterEx: number; // water needed for expanding
  sunEx: number; // sun needed for expanding
  waterSelf: number;
  sunSelf: number;
}
