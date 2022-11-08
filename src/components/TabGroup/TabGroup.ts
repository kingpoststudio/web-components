import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import Tab from '../Tab/Tab';

interface Link {
  label: string;
  href: string;
  isActive: boolean;
  isEmphasized: boolean;
}

const ANIMATION_DURATION_MS = 200;

const styles = css`
  .wrap {
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    margin: 0 auto;
  }

  .tabs {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 32rem;
    background: var(--color-gray-lightest);
  }

  .tabs ::slotted(kps-tab) {
    opacity: 0;
    display: block;
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    transition: opacity var(--ease-time) var(--ease-type);
  }

  .tabs ::slotted(kps-tab[active]) {
    z-index: 0;
  }

  .tabs ::slotted(kps-tab[active].visible) {
    opacity: 1;
  }

  .nav {
    display: flex;
    flex-direction: column;
    padding: 3rem 2rem;
    background: var(--color-secondary-darkest);
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

  .nav > ul.links > li > a.active,
  .nav > ul.links > li > a:hover {
    color: var(--color-tertiary-light);
  }
  
  @media (min-width: 768px) {
    .wrap {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .tabs {
      aspect-ratio: 1;
      justify-content: flex-start;
      border-bottom: none;
      border-right: 1px solid var(--color-secondary-darker);
    }
  }
`;

@customElement('kps-tab-group')
export default class TabGroup extends LitElement {
  static styles = styles;

  @property({ type: String })
    title: string = '';

  @state()
    links: Link[] = [];

  @state()
    emphasizedLink: Link | undefined;

  constructor() {
    super();
    this.updateLinks = this.updateLinks.bind(this);
    this.updateTabs = this.updateTabs.bind(this);

    // @ts-ignore
    this.addEventListener('imageMapPointEmphasized', (e: CustomEvent) => {
      const emphasizedHref = e.detail.point.getAttribute('href');
      const emphasizedLink = this.links.find((link) => link.href === emphasizedHref);
      this.emphasizedLink = emphasizedLink;
      this.updateLinks();
    });

    this.addEventListener('imageMapPointDeEmphasized', () => {
      this.emphasizedLink = undefined;
      this.updateLinks();
    });
  }

  get slottedTabs() {
    const slot = this.shadowRoot?.querySelector('slot');
    return slot?.assignedElements({ flatten: true }) as Tab[];
  }

  get tabLinks() {
    return this.links.map((link) => html`
      <li><a class="${link.isActive ? 'active' : ''} ${link.isEmphasized ? 'emphasized' : ''}" href="${link.href}">${link.label}</a></li>
    `);
  }

  static setTabStatus(tab: Tab, isActive: Boolean) {
    if (!tab) return;

    if (isActive) {
      tab.setAttribute('active', '');
      setTimeout(() => { tab.classList.add('visible'); }, ANIMATION_DURATION_MS * 2);
    } else {
      tab.classList.remove('visible');
      setTimeout(() => { tab.removeAttribute('active'); }, ANIMATION_DURATION_MS);
    }
  }

  updateLinks() {
    const { hash } = window.location;
    this.links = this.slottedTabs?.map((tab, i) => {
      const href = tab.getAttribute('name') ? `#${tab.getAttribute('name')}` : '';
      return {
        href,
        label: tab.getAttribute('label') || '',
        isActive: !i && !hash ? true : hash.includes(href),
        isEmphasized: this.emphasizedLink?.href === href,
      };
    });
  }

  updateTabs() {
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
    this.updateTabs();
    this.updateLinks();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('hashchange', () => {
      this.updateTabs();
      this.updateLinks();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', () => {
      this.updateTabs();
      this.updateLinks();
    });
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
            ${this.tabLinks}
          </ul>
        </div>
      </div>
    `;
  }
}
