<script>
  import { img } from "./imgs.ts";
  import { player } from "../controllers/game.ts";
  import { gameScale } from "./uiSettings.ts";
  import { movementDuration, playerFrame } from "./playerAnimation.ts";

  const x = player.x_val;
  const y = player.y_val;
</script>

<main style="--movementDuration: {movementDuration};">
  <div id="player-layer">
    <div
      id="player"
      style="
        left: {($x * 30 + 26) * gameScale}px;
        top: {($y * 30 + 5) * gameScale}px;
      "
    >
      <img src={img.player} alt="you" 
        style="
          transform: 
            translateX(calc(-37px * var(--gameScale) * {$playerFrame.y}))
            translateY(calc(-49px * var(--gameScale) * {$playerFrame.x}));
        "
      />
    </div>
  </div>
</main>

<style>
  #player-layer img {
    width: calc(37px * 4 * var(--gameScale));
    height: calc(49px * 3 * var(--gameScale));
    transform-origin: top left;
  }

  #player-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  #player {
    width: calc(37px * var(--gameScale));
    height: calc(49px * var(--gameScale));
    overflow: hidden;
    position: absolute;
    transition: top calc(var(--movementDuration) * 1s), left calc(var(--movementDuration) * 1s);
  }
</style>
