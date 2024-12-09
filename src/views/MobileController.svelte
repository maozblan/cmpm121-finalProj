<script>
  import ImgButton from "./ImgButton.svelte";
  import { img } from "./imgs";
  import { gameState, getCurrentMap, player } from "../controllers/game.ts";
  import { get } from "svelte/store";

  const UI_SCALE = 3;

  const btns = {
    wasdProps: {
      classes: "movement",
      iconData: {
        norm: img.wasd,
        pressed: img.wasd_p,
        scale: UI_SCALE,
        pxChange: -3,
      },
    },
    reap: {
      id: "f",
      classes: "action",
      iconData: {
        norm: img.reap,
        pressed: img.reap_p,
        scale: UI_SCALE,
        pxChange: -3,
      },
    },
    plant: {
      id: "f",
      classes: "action",
      iconData: {
        norm: img.plant,
        pressed: img.plant_p,
        scale: UI_SCALE,
        pxChange: -3,
      },
    },
    nextTurn: {
      id: "nextTurn",
      alt: "next turn",
      classes: "action",
      iconData: {
        width: 31,
        height: 32,
        norm: img.moon,
        pressed: img.moon,
        scale: UI_SCALE,
        pxChange: -3,
      },
    },
    cyclePlant: {
      id: "cyclePlant",
      alt: "cycle plant",
      classes: "action",
      iconData: {
        norm: img.sun,
        pressed: img.sun,
        scale: UI_SCALE,
        pxChange: -3,
      },
    },
  };

  const x = player.x_val;
  const y = player.y_val;
</script>

<main id="mobile-controls" style="--controller-scale: 3;">
  <div class="grid">
    <!-- row 1 -->
    <div>
      <ImgButton {...btns.nextTurn} />
    </div>
    <div>
      <ImgButton {...btns.wasdProps} id="w" alt="UP" />
    </div>
    <div>
      <ImgButton {...btns.cyclePlant} />
    </div>
    <!-- row 2 -->
    <div>
      <ImgButton
        {...btns.wasdProps}
        id="a"
        alt="LEFT"
        style="rotate: -90deg;"
      />
    </div>
    <div>
      {#if $gameState.mapUpdateLedger[$gameState.currentIndex].map.getCell($x, $y).hasPlant}
        <ImgButton {...btns.reap} />
      {:else}
        <ImgButton {...btns.plant} />
      {/if}
    </div>
    <div>
      <ImgButton
        {...btns.wasdProps}
        id="d"
        alt="RIGHT"
        style="rotate: 90deg;"
      />
    </div>
    <!-- row 3 -->
    <div></div>
    <div>
      <ImgButton
        {...btns.wasdProps}
        id="s"
        alt="DOWN"
        style="rotate: 180deg;"
      />
    </div>
    <div></div>
  </div>
</main>

<style>
  #mobile-controls {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: calc(0px * var(--controller-scale));
    width: fit-content;
    height: fit-content;
    margin-bottom: calc(20px * var(--controller-scale));
  }
  div {
    width: calc(45px * var(--controller-scale));
    height: calc(45px * var(--controller-scale));
  }
</style>
