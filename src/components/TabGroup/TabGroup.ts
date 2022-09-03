import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import Tab from '../Tab/Tab';

const ANIMATION_DURATION_MS = 300;

const styles = css`
  .wrap {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    max-width: 36rem;
    margin: 0 auto;
    background: var(--color-secondary-darkest);
  }

  .tabs {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 32rem;
  }

  .tabs ::slotted(kps-tab) {
    opacity: 0;
    display: none;
    position: absolute;
    transition: opacity var(--ease-time) var(--ease-type);
  }

  .tabs ::slotted(kps-tab[active]) {
    display: block;
  }

  .tabs ::slotted(kps-tab[active].visible) {
    opacity: 1;
  }

  .nav {
    display: flex;
    flex-direction: column;
    padding: 3rem 2rem;
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
    transition: color 0.3s ease-in-out;
  }

  .nav > ul.links > li > a:hover {
    color: var(--color-tertiary-light);
  }
  
  @media (min-width: 768px) {
    .wrap {
      grid-template-columns: 1fr 1fr;
      grid-gap: 1rem;
      max-width: 72rem;
    }

    .tabs {
      justify-content: flex-start;
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

  static setTabStatus(tab: Tab, isActive: Boolean) {
    if (isActive) {
      tab.setAttribute('active', '');
      setTimeout(() => { tab.classList.add('visible'); }, ANIMATION_DURATION_MS * 2);
    } else {
      tab.classList.remove('visible');
      setTimeout(() => { tab.removeAttribute('active'); }, ANIMATION_DURATION_MS);
    }
  }

  setActiveTab() {
    const hash = window.location.hash.replace('#', '');
    if (!hash) TabGroup.setTabStatus(this.slottedTabs?.[0], true);
    else {
      this.slottedTabs?.forEach((tab) => {
        const isActive = tab.getAttribute('name') === hash;
        TabGroup.setTabStatus(tab, isActive);
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
