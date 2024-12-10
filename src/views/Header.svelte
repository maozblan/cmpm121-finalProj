<script>
	import { img } from "./imgs.ts";
  import { get } from "svelte/store";
  import { POINTS_TO_WIN, gameState, chanceOfRain } from "../controllers/game.ts";
  import { overlayScale } from "./uiSettings.ts";
</script>

<main class="ui-layer" id="header" style="--uiScale: {overlayScale};">
  <div class="cloud back">
    <img src={$chanceOfRain ? img.rainCloud : img.cloud} alt="cloud" />
    <div class="text"
      style={$chanceOfRain ? "color: rgb(24,54,107)" : ""}
    >
      {$gameState.mapUpdateLedger[$gameState.currentIndex].map.getScore()} 
      {#if $gameState.mapUpdateLedger[$gameState.currentIndex].map.gameMode === "normal"}
        / 
        {$POINTS_TO_WIN}
      {/if}
    </div>
  </div>
  <div class="sun">
    <img src={img.sun} alt="sun" />
    <div class="text">
      <p>
        {$gameState.currentTurn}
      </p>
    </div>
  </div>
  <div class="cloud front">
    <img src={$chanceOfRain ? img.rainCloud : img.cloud} alt="cloud" />
    <div class="text"
      style={$chanceOfRain ? "color: rgb(24,54,107)" : ""}
    >
      {$chanceOfRain * 100}%
    </div>
  </div>
</main>

<style>
img {
  width: 100%;
  top: 0;
  left: 0;
}
.text {
  font-size: calc(7px * var(--uiScale));
  text-align: center;
  margin: 0;
}

.sun {
  width: calc(50px * var(--uiScale));
  height: calc(50px * var(--uiScale));
  top: calc(-2px * var(--uiScale));
  left: calc(10px * var(--uiScale));
}
.sun img {
  rotate: 180deg;
}
.sun .text {
  width: calc(50px * var(--uiScale));
  height: calc(50px * var(--uiScale));
  color: rgb(194,107,40);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cloud {
  width: calc(52px * var(--uiScale));
  height: calc(33px * var(--uiScale));
}
.cloud.back {
  top: calc(6px * var(--uiScale));
  left: calc(46px * var(--uiScale));
}
.cloud.front {
  top: calc(23px * var(--uiScale));
  left: calc(-9px * var(--uiScale));
}
.cloud .text {
  right: calc(0px * var(--uiScale));
  bottom: calc(2px * var(--uiScale));
  width: calc(30px * var(--uiScale));
  color: rgb(134,155,179);
}
</style>
