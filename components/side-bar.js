import { readDb, getAllSkills } from "../scripts/db-scripts.js";
import color from "../styles/colors.css" assert { type: "css" };

export class SideBar extends HTMLElement {
  static get styles() {
    return `
        :host {
          background-color:var(--light-brown);
          height:100vh;
        }

        button {
          background-color: var(--yellow);
          width:100%;
          padding: 10px;
          border:0;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        }

        button:hover {
          background-color: var(--orange);
        }

        ul {
          padding: 1rem;
        }

        li {
          margin: 10px 10px;
        }

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
    shadow.adoptedStyleSheets = [color, styles];
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
    listContainer.addEventListener("click", (event) => this.selectSkill(event));
    this.shadowRoot.appendChild(listContainer);
  }

  selectSkill(event) {
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
