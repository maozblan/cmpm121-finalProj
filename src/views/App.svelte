<script>
  import { get } from "svelte/store";
  import { gameState, chanceOfRain } from "../game.ts";
  import Grid from "./Grid.svelte";
  import Header from "./Header.svelte";
  import { t } from "svelte-i18n";
</script>

<main class="col-div">
  <h1>{$t("title")}</h1>
  <Header />
  <div id="controls">
    <h2>{$t("turn")}: {$gameState.currentTurn}</h2>
    <button id="undo">{$t("undo")}</button>
    <button id="redo">{$t("redo")}</button>
    <button id="loadautosave">{$t("load autosave")}</button>
    <button id="save1">{$t("save1")}</button>
    <button id="load1">{$t("load1")}</button>
    <button id="save2">{$t("save2")}</button>
    <button id="load2">{$t("load2")}</button>
  </div>

  <div id="mobile-controls">
    <button id="UP">{"^"}</button>
    <button id="LEFT">{"<"}</button>
    <button id="RIGHT">{">"}</button>
    <button id="DOWN">{"v"}</button>
    <button id="NEXT_TURN">{$t("turn")}</button>
    <button id="ACTION">{$t("action")}</button>
    <button id="PREV_PLANT">{$t("prev plant")}</button>
    <button id="NEXT_PLANT">{$t("next plant")}</button>
  </div>
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
</main>

<style>
  div {
    margin: 15px;
  }

  #htp {
    margin-left: 40px;
  }
</style>
