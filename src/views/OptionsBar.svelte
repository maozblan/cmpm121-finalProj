<script>
  import ImgButton from "./ImgButton.svelte";
  import { img } from "./imgs";

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

<main id="options-bar">
  <ImgButton {...optionButtons.help} />
  <ImgButton {...optionButtons.undo} />
  <ImgButton {...optionButtons.redo} />
  <ImgButton {...optionButtons.load} />
  <ImgButton {...optionButtons.save} />
</main>

<style>
  main {
    display: flex;
    flex-direction: row;
  }
</style>
