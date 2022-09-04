import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './Navigation.css';

const styles = css`
  :host {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 80;
    background: white;
    box-shadow: 0 0.25rem 1rem #2e2e2e1f;
  }

  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 6.5rem;
  }

  nav[isMobile="true"] > .nav-menu {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 6.5rem;
    left: 100%;
    width: 100vw;
    height: calc(100vh - 6.5rem);
    background: white;
    transition: left var(--ease-time) var(--ease-type);
  }

  nav[isOpen="true"] > .nav-menu {
    left: 0;
  }

  nav > .right-menu {
    display: flex;
    align-items: center;
  }

  nav > .right-menu > kps-icon.hamburger {
      margin-left: 2rem;
      cursor: pointer;
    }

  nav[isMobile="false"] > .right-menu > kps-icon.hamburger {
    display: none;
  }

  img.logo {
    position: relative;
    height: 100%;
    max-width: 12rem;
    max-height: 4rem;
    object-fit: contain;  
  }
  
  @media (min-width: 768px) {
    .nav-menu {
      height: 100%;
    }

    img.logo {
      max-width: auto;
    }
  }
`;

@customElement('kps-nav')
export default class Navigation extends LitElement {
  static styles = styles;

  @state()
  private isOpen = false;

  @state()
  private isMobile = window.innerWidth < 768;

  @property({ type: Object })
  private logoImg = { src: '', alt: '' };

  constructor() {
    super();
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  private toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  private handleResize() {
    if (!this.isMobile && window.innerWidth < 768) {
      this.isMobile = true;
    } else if (this.isMobile && window.innerWidth >= 768) {
      this.isMobile = false;
      if (this.isOpen) this.isOpen = false;
    }
  }

  private static handleMenuLinkClick(link: Element, teardown = false) {
    function handleClick(e: Event) {
      e.preventDefault();
      const parent = link.parentElement;
      if (parent) parent.classList.toggle('hs-item-open');
    }

    if (teardown) link.removeEventListener('click', handleClick);
    else link.addEventListener('click', handleClick);
  }

  private static setupMenuLinks(teardown = false) {
    const hsMenuLinks = document.querySelectorAll('[slot="main-menu"] .hs-menu-depth-1.hs-item-has-children > a');
    hsMenuLinks.forEach((link) => Navigation.handleMenuLinkClick(link, teardown));
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('resize', this.handleResize);
    Navigation.setupMenuLinks();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.handleResize);
    Navigation.setupMenuLinks(false);
  }

  protected render() {
    return html`
      <kps-container padding-x="lg">
        <nav isMobile="${this.isMobile}" isOpen="${this.isOpen}">
          <img class="logo" src="${this.logoImg.src}" alt="${this.logoImg.alt}" />

          <div class="nav-menu">
            <slot name="main-menu"></slot>
          </div>

          <div class="right-menu">
            <slot name="cta"></slot>
            <kps-icon class="hamburger" icon="hamburger" @click="${this.toggleMenu}"></kps-icon>
          </div>
        </nav>
      </kps-container>
    `;
  }
}
