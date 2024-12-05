<script>
  import { get } from 'svelte/store';
  import { POINTS_TO_WIN, gameState, chanceOfRain, gameMap } from '../game.ts';
  const turn = gameState.currentTurn;
  const score = gameMap.score;
</script>

<main>
  <div id="turn-counter">TURN: {$turn}</div>
  <div id="point-counter">{$score} / {$POINTS_TO_WIN}</div>
  <div id="chance-of-rain">
    {#if $chanceOfRain}
      <p>Chance of rain {get(chanceOfRain) * 100}%</p>
    {:else}
      <p>no rain this turn...</p>
    {/if}
  </div>
</main>

<style></style>
