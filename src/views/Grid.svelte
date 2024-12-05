<script>
  import { MAPSIZE, gameState, player } from "../game.ts";
  import { GameMap, Cell } from "../models/map.ts";
  import { PlantInfo } from "../models/PlantInfo.ts";
  import { get } from "svelte/store";
  const x_val = player.x_val;
  const y_val = player.y_val;
  const map = new GameMap(MAPSIZE);
  const ledger = gameState.mapUpdateLedger;
</script>

<main>
  {#snippet renderMap()}
    {#each { length: MAPSIZE }, i}
      {#each { length: MAPSIZE }, j}
        {@render renderCell(i, j)}
      {/each}
    {/each}
  {/snippet}

  {#snippet renderCell(i, j)}
    <div
      class="cell {new Cell(map.createDataView($ledger[get(ledger).length - 1].map, j, i)).hasPlant ? 'plant' : ''}"
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
    style="
      grid-template-columns: repeat({MAPSIZE}, 1fr);
      grid-template-rows: repeat({MAPSIZE}, 1fr)">
      {map.loadBuffer($ledger[get(ledger).length - 1].map)}
      {@render renderMap()}
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
