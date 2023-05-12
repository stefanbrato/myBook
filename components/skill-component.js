import color from "../styles/colors.css" assert { type: "css" };

export class SkillComponent extends HTMLElement {
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
    styles.replaceSync(SkillComponent.styles);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.adoptedStyleSheets = [color, styles];

    const parent = document.querySelector("app-main");
    parent.addEventListener("skillSelected", this.onSkillSelected.bind(this));

    const content = document.createElement("div");
    content.classList.add("tasks-info");
    this.shadowRoot.appendChild(content);
  }
  get taskName() {
    return this.getAttribute("taskName");
  }

  set taskName(value) {
    this.setAttribute("taskName", value);
  }

  get exp() {
    return this.getAttribute("exp");
  }

  set exp(value) {
    this.setAttribute("exp", value);
  }

  get level() {
    return this.getAttribute("level");
  }

  set level(value) {
    this.setAttribute("level", value);
  }

  get expToLevel() {
    return this.getAttribute("expToLevel");
  }

  set expToLevel(value) {
    this.setAttribute("expToLevel", value);
  }

  get description() {
    return this.getAttribute("description");
  }

  set description(value) {
    this.setAttribute("description", value);
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
customElements.define("skill-component", SkillComponent);
