const isMobile = window.matchMedia("(orientation: portrait)").matches;
const isTiny = window.matchMedia("(max-width: 350px)").matches;

export let gameScale = 1.3;        // field
export let uiScale = 3;          // buttons
export let overlayScale = 5;     // top left overlay

if (isMobile) {
  uiScale = 1.65;
  overlayScale = 3;
  gameScale = 0.8;
}

if (isTiny) {
  overlayScale = 2;
  gameScale = 0.6;
  uiScale = 1.4;
}
