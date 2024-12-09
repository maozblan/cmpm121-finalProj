<script>
  import { img } from "./imgs.ts";
  import { player } from "../controllers/game.ts";
  const x = player.x_val;
  const y = player.y_val;
  import { gameScale } from "./uiSettings.ts";
</script>

<main>
  <div id="player">
    <img
      src={img.player}
      alt="you"
      style="
        left: {($x + 1) * 30 * gameScale}px;
        top: {$y * 30 * gameScale}px;
      "
    />
  </div>
</main>

<style>
  #player img {
    width: calc(30px * var(--gameScale));
    height: auto;
    position: absolute;
    transform-origin: bottom center;
  }

  #player {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
</style>
