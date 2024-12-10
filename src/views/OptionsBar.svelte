<script>
  import { get } from "svelte/store";
  import ImgButton from "./ImgButton.svelte";
  import MobileController from "./MobileController.svelte";
  import { img } from "./imgs";
  import { currTab } from "./tabs";
  import playerInteraction from "../controllers/controller.ts";
  import { t } from "svelte-i18n";
  import { uiScale } from "./uiSettings.ts";

  const PIXEL_CHANGE = -3;
  const optionButtons = {
    undo: {
      id: "undo",
      alt: "undo",
      iconData: {
        norm: img.undo,
        pressed: img.undo_p,
        scale: uiScale,
        pxChange: PIXEL_CHANGE,
      },
    },
    redo: {
      id: "redo",
      alt: "redo",
      iconData: {
        norm: img.redo,
        pressed: img.redo_p,
        scale: uiScale,
        pxChange: PIXEL_CHANGE,
      },
    },
    load: {
      id: "load",
      alt: "load",
      iconData: {
        norm: img.load,
        pressed: img.load_p,
        scale: uiScale,
        pxChange: PIXEL_CHANGE,
      },
    },
    save: {
      id: "save",
      alt: "save",
      iconData: {
        norm: img.save,
        pressed: img.save_p,
        scale: uiScale,
        pxChange: PIXEL_CHANGE,
      },
    },
    help: {
      id: "help",
      alt: "help",
      iconData: {
        norm: img.help,
        pressed: img.help_p,
        scale: uiScale,
        pxChange: PIXEL_CHANGE,
      },
    },
  };
</script>

<main id="options-bar" class="col-div ui-layer">
  <div class="container">
    <div class="tab-content">
      {#if $currTab}
        {@render tabContent($currTab)}
      {:else}
        <MobileController />
      {/if}
    </div>
    <div class="tab-buttons">
      <ImgButton {...optionButtons.help} />
      <ImgButton {...optionButtons.undo} />
      <ImgButton {...optionButtons.redo} />
      <ImgButton {...optionButtons.save} />
      <ImgButton {...optionButtons.load} />
    </div>
  </div>

  {#snippet tabContent(tab)}
    {#if tab === "save"}
      <div class="col-div panel">
        <button id="save1" on:click={playerInteraction}>{$t("save1")}</button>
        <button id="save2" on:click={playerInteraction}>{$t("save2")}</button>
      </div>
    {:else if tab === "load"}
      <div class="col-div panel">
        <button id="load1" on:click={playerInteraction}>{$t("load1")}</button>
        <button id="load2" on:click={playerInteraction}>{$t("load2")}</button>
      </div>
    {:else if tab === "help"}
      <div class="col-div panel htp">
        <h2>{$t("how to play")}</h2>
        <div class="desktop">
          <p>{$t("how to move (desktop)")}</p>
          <p>{$t("how to plant (desktop)")}</p>
          <p>{$t("how to change plants (desktop)")}</p>
          <p>{$t("how to end turn (desktop)")}</p>
          <p>{$t("weather info")}</p>
          <p>{$t("your plants will grow accordingly")}</p>
        </div>
        <div class="mobile">
          <p>{$t("how to move (mobile)")}</p>
          <p>{$t("how to plant (mobile)")}</p>
          <p>{$t("how to change plants (mobile)")}</p>
          <p>{$t("how to end turn (mobile)")}</p>
          <p>{$t("weather info")}</p>
          <p>{$t("your plants will grow accordingly")}</p>
        </div>
        <h2>{$t("goal")}</h2>
        <p>{$t("what to do")}</p>
      </div>
    {/if}
  {/snippet}
</main>

<style>
  .container {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .tab-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .tab-content {
    width: 100%;
    height: 60vh;
    display: flex;
    justify-content: space-evenly;
    overflow-y: scroll;
  }

  .tab-content .panel {
    width: 80%;
    overflow-y: scroll;
    justify-content: space-evenly;
  }

  .htp .mobile {
    display: none;
  }
  .htp {
    margin: 0;
    padding: 0;
  }
</style>
