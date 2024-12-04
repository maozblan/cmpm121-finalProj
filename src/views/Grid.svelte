<script>
  import { MAPSIZE, player } from "../game.ts";
  import { gameState } from '../game.ts';
  import { PlantInfo } from "../models/PlantInfo.ts";
  const x_val = player.x_val;
  const y_val = player.y_val;
</script>

<main>
  {#snippet renderMap(map)}
    {#each { length: map.size }, i}
      {#each { length: map.size }, j}
        {@render renderCell(map, i, j)}
      {/each}
    {/each}
  {/snippet}

  {#snippet renderCell(map, i, j)}
    <div
      class="cell {map.getCell(j, i).hasPlant ? 'plant' : ''}"
      id="{$x_val === j && $y_val === i ? 'player-cell' : ''}"
      style="{
        map.getCell(j, i).hasPlant && ($x_val !== j || $y_val !== i )?
          `background-color: ${PlantInfo[map.getCell(j, i).plantType].color}`
          : 
          ''
        }">
      {#if map.getCell(j, i).hasPlant && ($x_val !== j || $y_val !== i )}
        {map.getCell(j, i).plantLevel.toString()}
      {/if}
    </div>
  {/snippet}

  <div 
    id="field"
    class="{$gameState.currentTurn}"
    style="
      grid-template-columns: repeat({MAPSIZE}, 1fr);
      grid-template-rows: repeat({MAPSIZE}, 1fr)">
      {@render renderMap(
        $gameState.mapUpdateLedger[$gameState.currentIndex].map,
      )}
  </div>
</main>

<style>
  #field {
    display: grid;
    gap: 5px;
    width: fit-content;
    height: fit-content;
  }
  #field div#player-cell {
    background-color: #f00;
  }
  #field div.cell {
    background-color: cornflowerblue;
  }
</style>
