<script>
  import { t } from "svelte-i18n";
  import playerInteraction from "../controllers/controller";
  import { img } from "./imgs";
  import { popupScale } from "./uiSettings";
</script>

<main class="layer" style="--scale: {popupScale};">
  <div id="popup">
    <img class="layer" src={img.popup} alt="popup" />
    <div class="text col-div layer">
      <h1>{$t("you win")}</h1>
      <div class="row-div choices">
        <button id="restartGame" on:click={playerInteraction}>{$t("restart game")}</button>
        <button id="continueGame" on:click={playerInteraction}>{$t("continue game")}</button>
      </div>
    </div>
  </div>
</main>

<style>
  .layer {
    position: absolute;
    top: 0;
    left: 0;
  }

  main {
    z-index: 100;
    width: 100vw;
    height: 100vh;
    padding: 0;
    margin: 0;
    display: flex;
    place-content: center;
    background-color: #4e6c3dcc;
  }

  div#popup {
    position: relative;
    align-self: center;
    width: calc(149px * var(--scale));
    height: calc(122px * var(--scale));
  }

  div.text {
    width: 60%;
    margin: 0 20%;
    margin-top: 20%;
    height: 35%;
  }

  h1 {
    color: #a66e3f;
  }

  button {
    background-color: #a66e3fcc;
  }

  div.choices {
    margin-top: auto;
    justify-content: space-between;
  }
  
  img {
    width: 100%;
    height: 100%;
  }
</style>
