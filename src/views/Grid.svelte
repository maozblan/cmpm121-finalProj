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
        {@render renderPlant(
          map.getCell(j, i).plantType,
          map.getCell(j, i).plantLevel,
        )}
      {/if}
    </div>
  {/snippet}

  {#snippet renderPlant(type, level)}
    <div class="plant">
      <img
        src={PlantInfo[type].imgs[level-1]}
        alt={`lvl${level} ${PlantInfo[type].name}`}
      /> 
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
