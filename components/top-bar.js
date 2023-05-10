import { readDb, getSkill } from "../scripts/db-scripts.js";

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
  #skillInfo;

  static observedAttributes = [`skill`];
  constructor() {
    super();
    const styles = new CSSStyleSheet();
    styles.replaceSync(TopBar.styles);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.adoptedStyleSheets = [styles];

    const parent = document.querySelector("app-main");
    parent.addEventListener("skillSelected", this.onSkillSelected.bind(this));

    const content = document.createElement("div");
    content.classList.add("skill-info");
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
    const content = this.shadowRoot.querySelector(".skill-info");
    content.innerHTML = `
      <div>${this.#skillInfo?.skillName}</div>
      <div>${this.#skillInfo?.level}</div>
    `;
  }

  onSkillSelected(event) {
    const skillDetails = getSkill(event.detail);
    this.#skillInfo = skillDetails;
    this.skill = skillDetails.skillName;
  }
}
customElements.define("top-bar", TopBar);
