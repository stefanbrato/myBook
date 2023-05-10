import { readDb, getAllSkills } from "../scripts/db-scripts.js";

export class SideBar extends HTMLElement {
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
    styles.replaceSync(SideBar.styles);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const skillList = getAllSkills();
    const listContainer = document.createElement("ul");
    listContainer.classList.add("skill-list");
    skillList.map((skill) => {
      let skillContainer = document.createElement("li");
      skillContainer.classList.add("skill");
      let button = document.createElement("button");
      button.setAttribute("skill", `${skill.skillName}`);
      button.textContent = `${skill.skillName}  ${skill.level}`;
      skillContainer.appendChild(button);
      listContainer.appendChild(skillContainer);
    });
    listContainer.addEventListener("click", (event) =>
      this.#selectSkill(event)
    );
    this.shadowRoot.appendChild(listContainer);
  }

  #selectSkill(event) {
    const selectedSkill = event.target.getAttribute("skill");
    this.shadowRoot.dispatchEvent(
      new CustomEvent("skillSelected", {
        detail: selectedSkill,
        bubbles: true,
        composed: true,
      })
    );
  }
}
customElements.define("side-bar", SideBar);
