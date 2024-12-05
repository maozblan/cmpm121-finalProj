<script>
  import { get } from 'svelte/store';
  import { gameState, chanceOfRain } from '../game.ts';
  import Grid from './Grid.svelte';
  import Header from './Header.svelte';
</script>

<main class="col-div">
  <h1>cmpm121 plant game</h1>
  <Header />
  <div id="controls">
    <h2>TURN: {$gameState.currentTurn}</h2>
    <button id="undo">Undo</button>
    <button id="redo">Redo</button>
    <button id="loadautosave">Load Autosave</button>
    <button id="save1">save1</button>
    <button id="load1">load1</button>
    <button id="save2">save2</button>
    <button id="load2">load2</button>
  </div>
  <div id="event">
    {#if $chanceOfRain}
      <p>Chance of rain {get(chanceOfRain) * 100}%</p>
    {:else}
      <p>no rain this turn...</p>
    {/if}
  </div>
  <div class="row-div">
    <Grid />
    <div id="htp">
      <h2>How to Play</h2>
      <p>Use WASD to move your character</p>
      <p>F to reap/sow plants on current tile</p>
      <p>SPACE to end turn</p>
      <p>each cell will randomly receive 3-7 sun and rain each turn</p>
      <p>your plants will grow accordingly</p>
      <h2>Goal</h2>
      <p>Balance plant 1 and plant 2 to grow both to appropriate levels</p>
      <p>while still keeping plant 2 greater than plant 1</p>
    </div>
  </div>
</main>

<style>
  div {
    margin: 15px;
  }

  #htp {
    margin-left: 40px;
  }
</style>
