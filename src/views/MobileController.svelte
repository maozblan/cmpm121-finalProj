<script>
  import ImgButton from "./ImgButton.svelte";
  import { img } from "./imgs";
  import { gameState, getCurrentMap } from "../game.ts";
  import { player } from "../game.ts";
  import { get } from "svelte/store";

  const UI_SCALE = 3;
  const wasdProps = {
    classes: "movement",
    iconData: {
      norm: img.wasd,
      pressed: img.wasd_p,
      scale: UI_SCALE,
      pxChange: -3,
    },
  };

  const centerBtn = {
    reap: {
      classes: "action",
      iconData: {
        norm: img.reap,
        pressed: img.reap_p,
        scale: UI_SCALE,
        pxChange: -3,
      },
    },
    plant: {
      classes: "action",
      iconData: {
        norm: img.plant,
        pressed: img.plant_p,
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
    <div></div>
    <div>
      <ImgButton {...wasdProps} id="w" alt="UP" />
    </div>
    <div></div>
    <!-- row 2 -->
    <div>
      <ImgButton {...wasdProps} id="a" alt="LEFT" style="rotate: -90deg;" />
    </div>
    <div>
      {#if $gameState.mapUpdateLedger[$gameState.currentIndex].map.getCell($x, $y).hasPlant}
        <ImgButton {...centerBtn.reap} id="f" />
      {:else}
        <ImgButton {...centerBtn.plant} id="f" />
      {/if}
    </div>
    <div>
      <ImgButton {...wasdProps} id="d" alt="RIGHT" style="rotate: 90deg;" />
    </div>
    <!-- row 3 -->
    <div></div>
    <div>
      <ImgButton {...wasdProps} id="s" alt="DOWN" style="rotate: 180deg;" />
    </div>
    <div></div>
  </div>
</main>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: calc(0px * var(--controller-scale));
  }
  div {
    width: calc(45px * var(--controller-scale));
    height: calc(45px * var(--controller-scale));
  }
</style>
