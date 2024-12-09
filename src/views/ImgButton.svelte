<script>
  let {
    width = 45,
    height = 45,
    id,
    classes = "",
    alt,
    style = "",
    iconData,
  } = $props();
  let {
    norm,
    pressed,
    iconWidth = 40,
    iconHeight = 40,
    scale = 1,
    pxChange = 0,
  } = iconData;
</script>

<main
  style="
  --controller-scale: {scale};
  --icon-width: {iconWidth}px;
  --icon-height: {iconHeight}px;
  --button-width: {width}px;
  --button-height: {height}px;
  --pressed-px-change: {pxChange}px;
"
>
  <button {id} class={classes} {style}>
    <img src={norm} {alt} />
    <img src={pressed} {alt} />
  </button>
</main>

<style>
  button {
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 0;
    background-color: transparent;
    width: calc(var(--button-width) * var(--controller-scale));
    height: calc(var(--button-height) * var(--controller-scale));
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button img {
    width: calc(var(--icon-width) * var(--controller-scale));
    width: calc(var(--icon-height) * var(--controller-scale));
  }
  /* disable items inside buttons to be clicked */
  button * {
    pointer-events: none;
  }
  /* button "animations" */
  button img:first-child ~ * {
    display: none;
  }
  button:active > img:first-child {
    display: none;
  }
  button:active img:first-child ~ img {
    display: block;
    width: calc(
      (var(--icon-width) + var(--pressed-px-change)) * var(--controller-scale)
    );
    height: calc(
      (var(--icon-height) + var(--pressed-px-change)) * var(--controller-scale)
    );
  }
</style>
