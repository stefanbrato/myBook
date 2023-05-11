import "./components/side-bar.js";
import "./components/top-bar.js";
import { initDatabase } from "./scripts/db-scripts.js";

export class Main extends HTMLElement {
  /* ... */
  static get styles() {
    return `
      :host {
        display:grid;
        grid-template-areas:
          "a b b"
          "a c c"
          "a c c";
        grid-template-columns: 200px 1fr;
      }

      side-bar {
        grid-area: a;
      }

      top-bar {
        grid-area: b;
      }
    `;
  }

  constructor() {
    super();
    const styles = new CSSStyleSheet();
    styles.replaceSync(Main.styles);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.adoptedStyleSheets = [styles];
    initDatabase();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const sideBar = document.createElement("side-bar");
    const topBar = document.createElement("top-bar");
    this.shadowRoot.appendChild(sideBar);
    this.shadowRoot.appendChild(topBar);
  }
}
customElements.define("app-main", Main);
