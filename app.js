import "./components/side-bar.js";
import { initDatabase, readDb, getSkills } from "./scripts/db-scripts.js";

import { LitElement, html, css } from "lit";

export class Main extends LitElement {
  /* ... */
  static properties = {
    mode: { type: String },
    itemList: {},
  };

  constructor() {
    super();
    initDatabase();
  }

  static get styles() {
    return css`
      p {
        color: green;
      }
    `;
  }

  render() {
    return html`<side-bar .skills=${getSkills()}></side-bar>`;
  }
}
customElements.define("app-main", Main);
