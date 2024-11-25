import "./style.css";
import { img } from "./views/imgs.ts";

const APP_NAME = "cmpm121-final";
const app = document.querySelector<HTMLDivElement>("#app")!;

document.title = APP_NAME;
app.innerHTML = APP_NAME;

const title = document.createElement("h1");
app.append(title);

const image = document.createElement("img");
image.src = img.sampleImage
