import { LitElement, html, css } from "lit";

export class SkillBar extends LitElement {
  /* ... */
  static properties = {
    mode: { type: String },
    data: { attribute: false },
  };

  constructor() {
    super();
    this.data = {};
  }
  static styles = css`
    p {
      color: green;
    }
  `;

  render() {
    return html`<div>Willpower</div>`;
  }
}
customElements.define("skill-bar", SkillBar);
