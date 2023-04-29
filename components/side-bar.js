import { LitElement, html, css } from "lit";

export class SideBar extends LitElement {
  /* ... */
  static get properties() {
    return {
      skills: { type: Array },
    };
  }

  constructor() {
    super();
    console.log(this.skills);
  }
  static styles = css`
    .skills {
      display: flex;
      flex-direction: column;
      width: 100px;
    }

    .skill {
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }
  `;

  render() {
    return html` <div class="skills">
      ${this.skills
        ? html`${this.skills.map((skill) => {
            return html`<button class="skill">
              <div>${skill.skillName}</div>
              <label>${skill.level}</label>
            </button>`;
          })}`
        : html``}
    </div>`;
  }

  testfunction() {}
}
customElements.define("side-bar", SideBar);
