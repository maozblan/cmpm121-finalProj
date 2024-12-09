<script>

  import { img } from "./imgs";

</script>
<scritp>

</scritp>

<main id="mobile-controls">
  <div class="grid">
    <!-- row 1 -->
    <div></div>
    <div>
      <button id="w" class="movement">
        <img src={img.wasd} alt="UP" />
        <img src={img.wasd_p} alt="UP" />
      </button>
    </div>
    <div></div>
    <!-- row 2 -->
    <div>
      <button id="a" class="movement" style="rotate: -90deg;">
        <img src={img.wasd} alt="LEFT" />
        <img src={img.wasd_p} alt="LEFT" />
      </button>
    </div>
    <div></div>
    <div>
      <button id="d" class="movement" style="rotate: 90deg;">
        <img src={img.wasd} alt="RIGHT" />
        <img src={img.wasd_p} alt="LEFT" />
      </button>
    </div>
    <!-- row 3 -->
    <div></div>
    <div>
      <button id="s" class="movement" style="rotate: 180deg;">
        <img src={img.wasd} alt="DOWN" />
        <img src={img.wasd_p} alt="DOWN" />
      </button>
    </div>
    <div></div>
  </div>
</main>

<style>
  :root {
    --controller-scale: 3;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: calc(0px * var(--controller-scale));
  }
  div {
    width: calc(45px * var(--controller-scale));
    height: calc(45px * var(--controller-scale));
  }
  button {
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 0;
    background-color: transparent;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button.movement img{
    width: calc(40px * var(--controller-scale));
  }
  /* disable items inside buttons to be clicked */
  button * {
    pointer-events: none;
  }
  /* button "animations" */
  button img:first-child ~ *{
    display: none;
  }
  button:active > img:first-child {
    display: none;
  }
  button:active img:first-child ~ img {
    display: block;
    width: calc(37px * var(--controller-scale));
    height: calc(37px * var(--controller-scale));
  }
</style>
