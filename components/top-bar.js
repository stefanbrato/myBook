import { readDb, getSkills } from "../scripts/db-scripts.js";

export class TopBar extends HTMLElement {
  static get styles() {
    return `    
        .skills {
            display: flex;
            flex-direction: column;
            width: 100px;
        }
    
        .skill {
            display: flex;
            flex-direction: row;
            gap: 1rem;`;
  }

  constructor() {
    super();
    const styles = new CSSStyleSheet();
    styles.replaceSync(TopBar.styles);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.adoptedStyleSheets = [styles];
    const undeAscult = document.querySelector("app-main");
    undeAscult.addEventListener("skillSelected", (event) => console.log(event));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const ceva = document.createElement("div");
    this.shadowRoot.appendChild(ceva);
  }
}
customElements.define("top-bar", TopBar);
