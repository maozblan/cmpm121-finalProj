<script>
  import { get } from "svelte/store";
  import ImgButton from "./ImgButton.svelte";
  import MobileController from "./MobileController.svelte";
  import { img } from "./imgs";
  import { currTab } from "./tabs";
  import playerInteraction from "../controllers/controller.ts";
  import { t } from "svelte-i18n";

  function foo() {
    console.log("foo");
  }

  const UI_SCALE = 3;
  const PIXEL_CHANGE = -3;
  const optionButtons = {
    undo: {
      id: "undo",
      alt: "undo",
      iconData: {
        norm: img.undo,
        pressed: img.undo_p,
        scale: UI_SCALE,
        pxChange: PIXEL_CHANGE,
      },
    },
    redo: {
      id: "redo",
      alt: "redo",
      iconData: {
        norm: img.redo,
        pressed: img.redo_p,
        scale: UI_SCALE,
        pxChange: PIXEL_CHANGE,
      },
    },
    load: {
      id: "load",
      alt: "load",
      iconData: {
        norm: img.load,
        pressed: img.load_p,
        scale: UI_SCALE,
        pxChange: PIXEL_CHANGE,
      },
    },
    save: {
      id: "save",
      alt: "save",
      iconData: {
        norm: img.save,
        pressed: img.save_p,
        scale: UI_SCALE,
        pxChange: PIXEL_CHANGE,
      },
    },
    help: {
      id: "help",
      alt: "help",
      iconData: {
        norm: img.help,
        pressed: img.help_p,
        scale: UI_SCALE,
        pxChange: PIXEL_CHANGE,
      },
    },
  };
</script>

<main id="options-bar" class="col-div ui-layer">
  <div class="container">
    {#if $currTab}
      {@render tabContent($currTab)}
    {:else}
      <MobileController />
    {/if}
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
    <div class="col-div tab-content">
      <button id="save1" on:click={playerInteraction}>save slot 1</button>
      <button id="save2" on:click={playerInteraction}>save slot 2</button>
    </div>
    {:else if tab === "load"}
    <div class="col-div tab-content">
      <button id="load1" on:click={playerInteraction}>load save slot 1</button>
      <button id="load2" on:click={playerInteraction}>load save slot 2</button>
    </div>
    {:else if tab === "help"}
    <div class="col-div tab-content">
      <h2>{$t("how to play")}</h2>
      <p>{$t("how to move")}</p>
      <p>{$t("how to plant")}</p>
      <p>{$t("how to end turn")}</p>
      <p>{$t("sun rates")}</p>
      <p>{$t("your plants will grow accordingly")}</p>
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
  }

  .tab-buttons {
    display: flex;
    flex-direction: row;
  }

  .tab-content {
    width: 100%;
    height: fit-content;
    justify-content: space-evenly;
  }
</style>
