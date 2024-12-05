<script>
  import { get } from 'svelte/store';
  import { POINTS_TO_WIN, gameState, chanceOfRain } from '../game.ts';
</script>

<main>
  <div id="turn-counter">TURN: {$gameState.currentTurn}</div>
  <div id="point-counter">
    {$gameState.mapUpdateLedger[$gameState.currentIndex].map.getScore()} / 
    {$POINTS_TO_WIN}
  </div>
  <div id="chance-of-rain">
    {#if $chanceOfRain}
      <p>Chance of rain {get(chanceOfRain) * 100}%</p>
    {:else}
      <p>no rain this turn...</p>
    {/if}
  </div>
</main>

<style></style>
