import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import Tab from '../Tab/Tab';

const styles = css`
  .wrap {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    background: var(--color-secondary-darkest);
  }

  .tabs {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 2rem;
  }

  .tabs ::slotted(kps-tab) {
    display: none;
  }

  .tabs ::slotted(kps-tab[active]) {
    display: block;
  }

  .nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
  }

  .nav > * {
    margin-bottom: 1.5rem;
  }

  .nav > *:last-child {
    margin-bottom: 0;
  }

  .nav > ul.links {
    padding: 0;
    list-style-type: none;
  }

  .nav > ul.links > li {
    margin-bottom: 0.5rem;
  }

  .nav > ul.links > li:last-child {
    margin-bottom: 0;
  }

  .nav > ul.links > li > a {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-white);
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }

  .nav > ul.links > li > a:hover {
    color: var(--color-tertiary-light);
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

  get slottedTabs() {
    const slot = this.shadowRoot?.querySelector('slot');
    return slot?.assignedElements({ flatten: true }) as Tab[];
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

  onSlotChange() {
    this.tabs = this.slottedTabs;
    this.setActiveTab();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('hashchange', this.setActiveTab);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', this.setActiveTab);
  }

  render() {
    return html`
      <div class="wrap">
        <div class="tabs">
          <slot @slotchange="${this.onSlotChange}"></slot>
        </div>
        <div class="nav">
          <div class="title">
            <slot name="title"></slot>
          </div>
          <div class="subtitle">
            <slot name="subtitle"></slot>
          </div>
          <ul class="links">
            ${this.tabs.map((tab) => html`
              <li><a href="#${tab.getAttribute('name')}">${tab.getAttribute('label')}</a></li>
            `)}
          </ul>
        </div>
      </div>
    `;
  }
}
