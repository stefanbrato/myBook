import { readDb, getTasks } from "../scripts/db-scripts.js";
import color from "../styles/colors.css" assert { type: "css" };

export class ContentBar extends HTMLElement {
  static get styles() {
    return `    
        :host{
          background-color: var(--yellow);
          height: 10vh;
        }
    `;
  }

  #taskInfo;

  static observedAttributes = [`skill`];
  constructor() {
    super();
    const styles = new CSSStyleSheet();
    styles.replaceSync(ContentBar.styles);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.adoptedStyleSheets = [color, styles];

    const parent = document.querySelector("app-main");
    parent.addEventListener("skillSelected", this.onSkillSelected.bind(this));

    const content = document.createElement("div");
    content.classList.add("tasks-info");
    this.shadowRoot.appendChild(content);
  }
  get skill() {
    return this.getAttribute("skill");
  }

  set skill(value) {
    this.setAttribute("skill", value);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const content = this.shadowRoot.querySelector(".tasks-info");
    content.innerHTML = `
      <div>${this.#taskInfo}</div>
    `;
  }

  onSkillSelected(event) {
    const skillName = event.detail;
    const skillTasks = getTasks(skillName);
    console.log(skillTasks);
    this.#taskInfo = skillTasks;
    this.skill = skillName;
  }
}
customElements.define("content-bar", ContentBar);
