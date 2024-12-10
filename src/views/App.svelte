<script>
  import { get } from "svelte/store";
  import { t } from "svelte-i18n";
  import Grid from "./Grid.svelte";
  import MobileController from "./MobileController.svelte";
  import OptionsBar from "./OptionsBar.svelte";
  import Popup from "./Popup.svelte";
  import Header from "./Header.svelte";
  import { gameState, chanceOfRain } from "../controllers/game.ts";
  import Controls from "./MobileController.svelte";
</script>

<main class="col-div">
  <h1>{$t("title")}</h1>
  <Header />
  <div id="main-game">
    <Grid />
  </div>
  <OptionsBar />
  {#if
    $gameState.mapUpdateLedger[$gameState.currentIndex].map.winState
    &&
    $gameState.mapUpdateLedger[$gameState.currentIndex].map.gameMode === "normal"
  }
    <Popup />
  {/if}
</main>

<style>
  h1 {
    margin: 3vh 0;
  }
</style>
