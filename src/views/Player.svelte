<script>
  import { img } from "./imgs.ts";
  import { player } from "../controllers/game.ts";
  const x = player.x_val;
  const y = player.y_val;
  const scale = 1;
</script>

<main>
  <div id="player">
    <img
      src={img.player}
      alt="you"
      style="
        left: {($x + 1) * 30 * scale}px;
        top: {$y * 30 * scale}px;
      "
    />
  </div>
</main>
