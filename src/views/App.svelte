<script>
  import { get } from "svelte/store";
  import { gameState, chanceOfRain } from "../game.ts";
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
  <div id="event">
    {#if $chanceOfRain}
      <p>{$t("chance of rain")} {get(chanceOfRain) * 100}%</p>
    {:else}
      <p>{$t("no chance of rain")}</p>
    {/if}
  </div>
  <div class="row-div">
    <Grid />
    <div id="htp">
      <h2>{$t("how to play")}</h2>
      <p>{$t("how to move")}</p>
      <p>{$t("how to plant")}</p>
      <p>{$t("how to end turn")}</p>
      <p>{$t("sun rates")}</p>
      <p>{$t("your plants will grow accordingly")}</p>
      <h2>{$t("goal")}</h2>
      <p>{$t("what to do")}</p>
    </div>
  </div>
  <MobileController />
  <OptionsBar />
</main>

<style>
  div {
    margin: 15px;
  }

  #htp {
    margin-left: 40px;
  }
</style>
