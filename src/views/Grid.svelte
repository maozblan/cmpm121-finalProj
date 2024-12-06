<script>
  import { MAPSIZE } from "../game.ts";
  import { gameState } from '../game.ts';
  import { PlantInfo } from "../models/PlantInfo.ts";
  import { img } from "./imgs.ts";
  import Player from "./Player.svelte";
</script>

<main>
  {#snippet renderMap(map)}
    {#each { length: map.size + 2 }, i}
      {#each { length: map.size + 2 }, j}
        {#if i === 0 || i === map.size + 1 || j === 0 || j === map.size + 1}
          <div class="cell border"></div>
        {:else}
          {@render renderCell(map, i-1, j-1)}
        {/if}
      {/each}
    {/each}
  {/snippet}

  {#snippet renderCell(map, i, j)}
    <div
      class="cell"
    >
      <img src={img.soil} alt="soil" />
      {#if map.getCell(j, i).hasPlant}
        <div
          class="plant"
          style="background-color: {PlantInfo[map.getCell(j, i).plantType].color};"
        >
          {map.getCell(j, i).plantLevel.toString()}
        </div>
      {/if}
    </div>
  {/snippet}

  <div id="field-container">
    <div 
      id="field"
      class="{$gameState.currentTurn}"
      style="
        grid-template-columns: repeat({MAPSIZE+2}, 1fr);
        grid-template-rows: repeat({MAPSIZE+2}, 1fr)">
        {@render renderMap(
          $gameState.mapUpdateLedger[$gameState.currentIndex].map,
        )}
    </div>
    <Player />
  </div>
</main>
