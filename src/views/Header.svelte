<script>
	import { img } from './imgs.ts';
  import { get } from 'svelte/store';
  import { POINTS_TO_WIN, gameState, chanceOfRain } from '../game.ts';
</script>

<main class="ui-layer" id="header">
  <div class="cloud back">
    <img src={img.cloud} alt="cloud" />
    <div class="text">
      {$gameState.mapUpdateLedger[$gameState.currentIndex].map.getScore()} / 
      {$POINTS_TO_WIN}
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
    <img src={img.cloud} alt="cloud" />
    <div class="text">
      {$chanceOfRain * 100}%
    </div>
  </div>
</main>

<style></style>
