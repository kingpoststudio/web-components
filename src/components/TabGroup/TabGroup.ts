import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import Tab from '../Tab/Tab';

const styles = css`
  .wrap {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    height: 36rem;
  }

  .tabs {
    position: relative;
    display: flex;
    width: 100%;
  }

  .tabs ::slotted(kps-tab) {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
  }

  .tabs ::slotted(kps-tab[active]) {
    display: block;
  }

  .nav {

  }
  
  @media (min-width: 768px) {
    .wrap {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

@customElement('kps-tab-group')
export default class TabGroup extends LitElement {
  static styles = styles;

  @property({ type: String })
    title: string = '';

  @state()
    tabs: Tab[] = [];

  constructor() {
    super();
    this.setActiveTab = this.setActiveTab.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('hashchange', this.setActiveTab);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', this.setActiveTab);
  }

  get slottedTabs() {
    const slot = this.shadowRoot?.querySelector('slot');
    return slot?.assignedElements({ flatten: true });
  }

  setActiveTab() {
    const hash = window.location.hash.replace('#', '');

    if (!hash) this.slottedTabs?.[0].setAttribute('active', '');
    else {
      this.slottedTabs?.forEach((tab) => {
        if (tab.getAttribute('name') === hash) tab.setAttribute('active', '');
        else tab.removeAttribute('active');
      });
    }
  }

  firstUpdated() {
    this.setActiveTab();
  }

  render() {
    return html`
      <div class="wrap">
        <div class="tabs">
          <slot></slot>
        </div>
        <div class="nav">
          <h3 class="title">${this.title}</h3>
          ${this.slottedTabs?.map(() => html`
            <a href="" class="tab">Link</a>
          `)}
        </div>
      </div>
    `;
  }
}
