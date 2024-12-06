<script>
  import { img } from "./imgs.ts";
  import { player } from "../game.ts";
  const x = player.x_val;
  const y = player.y_val;
</script>

<main>
  <div id="player">
    <img
      src={img.player}
      alt="you"
      style="
        left: {($x + 1) * 30}px;
        top: {$y * 30}px;
      "
    />
  </div>
</main>
