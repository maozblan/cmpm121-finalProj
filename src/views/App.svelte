<script>
  import { get } from "svelte/store";
  import { gameState, chanceOfRain } from "../controllers/game.ts";
  import Grid from "./Grid.svelte";
  import Header from "./Header.svelte";
  import { t } from "svelte-i18n";
  import Controls from "./MobileController.svelte";
  import MobileController from "./MobileController.svelte";
  import OptionsBar from "./OptionsBar.svelte";
</script>

<main class="col-div">
  <h1>{$t("title")}</h1>
  <Header />
  <div id="main-game">
    <Grid />
  </div>
  <OptionsBar />
</main>

<style>
  h1 {
    margin: 3vh 0;
  }
</style>
