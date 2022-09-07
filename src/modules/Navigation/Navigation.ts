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
    width: 100%;
    height: calc(100vh - 6.5rem);
    box-sizing: border-box;
    background: white;
    transition: left var(--ease-time) var(--ease-type);
  }

  nav[isMobile="true"][isOpen="true"] > .nav-menu {
    left: 0;
  }

  nav[isMobile="true"] > .nav-menu > .social-media {
    width: 100%;
    height: 15rem;
    text-align: center;
    text-transform: uppercase;
    font-weight: var(--font-weight-semibold);
    color: var(--color-gray-light);
  }

  nav > .right-menu {
    display: flex;
    align-items: center;
  }

  nav[isMobile="true"] > .right-menu > .cta {
    opacity: 1;
    transition: opacity var(--ease-time) var(--ease-type);
  }

  nav[isMobile="true"][isOpen="true"] > .right-menu > .cta {
    opacity: 0;
    pointer-events: none;
  }

  nav kps-icon {
    cursor: pointer;
  }

  nav > kps-icon.back {
    opacity: 0;
    position: absolute;
    left: -4rem;
    transform: rotate(270deg);
    transition: opacity var(--ease-time) var(--ease-type), left var(--ease-time) var(--ease-type);
  }

  nav[isSubOpen="true"] > kps-icon.back {
    opacity: 1;
    left: 2rem;
    position: absolute;
    transform: rotate(270deg);
  }

  nav > .right-menu > .buttons {
    display: grid;
    place-content: center;    
    width: 2rem;
    height: 2rem;
    margin-left: 1rem;
  }

  nav > .right-menu > .buttons > kps-icon {
    grid-row: 1;
    grid-column: 1;
    transition: opacity var(--ease-time) var(--ease-type);
  }

  nav[isMobile="true"] > .right-menu > .buttons > kps-icon.hamburger,
  nav[isMobile="true"][isOpen="true"] > .right-menu > .buttons > kps-icon.cross {
    opacity: 1;
  }

  nav[isMobile="true"] > .right-menu > .buttons > kps-icon.cross,
  nav[isMobile="true"][isOpen="true"] > .right-menu > .buttons > kps-icon.hamburger {
    opacity: 0;
  }

  nav[isMobile="false"] > .right-menu > .buttons {
    display: none; 
  }

  nav > img.logo {
    position: relative;
    height: 100%;
    max-width: 12rem;
    max-height: 4rem;
    object-fit: contain;  
  }

  nav[isMobile="true"] > img.logo {
    left: 0;
    transition: left var(--ease-time) var(--ease-type);
  }

  nav[isMobile="true"][isOpen="true"] > img.logo {
    left: 30%;
  }

  @media (min-width: 768px) {
    .social-media {
      display: none;
    }

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
  private isSubOpen = false;

  @state()
  private isMobile = window.innerWidth < 768;

  @property({ type: Object })
  private logoImg = { src: '', alt: '' };

  constructor() {
    super();
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.menuLinkClickHandler = this.menuLinkClickHandler.bind(this);
  }

  private toggleMenu() {
    this.isOpen = !this.isOpen;
    if (!this.isOpen && this.isSubOpen) this.toggleSubMenu();
  }

  private toggleSubMenu() {
    this.isSubOpen = !this.isSubOpen;

    if (!this.isSubOpen) {
      const openItem = document.querySelector('.hs-item-open');
      if (openItem) openItem.classList.remove('hs-item-open');
    }
  }

  private toggleSubOpen(el: Element) {
    el.classList.toggle('hs-item-open');
    this.toggleSubMenu();
  }

  private handleResize() {
    if (window.innerWidth < 768 && !this.isMobile) {
      this.isMobile = true;
      this.manageMenuLinks();
    } else if (window.innerWidth >= 768 && this.isMobile) {
      this.isMobile = false;
      if (this.isOpen) this.toggleMenu();
      this.manageMenuLinks();
    }
  }

  private menuLinkClickHandler(link: Element, teardown?: Boolean) {
    const handleClick = (e: Event) => {
      e.preventDefault();
      if (link) this.toggleSubOpen(link);
    };

    if (teardown) {
      const newLink = link.cloneNode(true);
      link.parentNode?.replaceChild(newLink, link);
    } else link.addEventListener('click', handleClick);
  }

  private manageMenuLinks() {
    const hsMenuLinks = document.querySelectorAll('[slot="main-menu"] li.hs-menu-depth-1.hs-item-has-children');
    hsMenuLinks.forEach((link) => {
      if (this.isMobile) this.menuLinkClickHandler(link);
      else this.menuLinkClickHandler(link, true);
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('keyup', (ke: KeyboardEvent) => {
      if (ke.key === 'Escape' && this.isOpen) this.toggleMenu();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.manageMenuLinks();
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('keyup', (ke: KeyboardEvent) => {
      if (ke.key === 'Escape' && this.isOpen) this.toggleMenu();
    });
  }

  protected render() {
    return html`
      <kps-container padding-x="lg">
        <nav isMobile="${this.isMobile}" isOpen="${this.isOpen}" isSubOpen="${this.isSubOpen}">
          <kps-icon class="back" icon="chevron" @click="${this.toggleSubMenu}"></kps-icon>

          <img class="logo" src="${this.logoImg.src}" alt="${this.logoImg.alt}" />

          <div class="nav-menu">
            <slot name="main-menu" @slotchange=${() => this.manageMenuLinks()}></slot>

            <div class="social-media">
              <span>Follow Us</span>
              <div class="social-icons">
                <slot name="social-media"></slot>
              </div>
            </div>
          </div>

          <div class="right-menu">
            <div class="cta">
              <slot name="cta"></slot>
            </div>

            <div class="buttons">
              <kps-icon class="hamburger" icon="hamburger" @click="${this.toggleMenu}"></kps-icon>
              <kps-icon class="cross" icon="cross" @click="${this.toggleMenu}"></kps-icon>            
            </div>
          </div>
        </nav>
      </kps-container>
    `;
  }
}
