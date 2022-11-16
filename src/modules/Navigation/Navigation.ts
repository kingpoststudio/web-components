import { html, unsafeCSS, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import Styles from './Navigation.css';

@customElement('kps-nav')
export default class Navigation extends LitElement {
  static styles = [unsafeCSS(Styles)];

  @state()
  private isMenuOpen = false;

  @state()
  private isSubMenuOpen = false;

  @state()
  private isMobileView = window.innerWidth < 768;

  @property({ type: String })
  private theme: 'light' | 'dark' = 'light';

  @property({ type: Object })
  private logoImg = { src: '', alt: '' };

  constructor() {
    super();
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.menuLinkClickHandler = this.menuLinkClickHandler.bind(this);
  }

  private toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen && this.isSubMenuOpen) this.toggleSubMenu();
  }

  private toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;

    if (!this.isSubMenuOpen) {
      const openItem = document.querySelector('.hs-item-open');
      if (openItem) openItem.classList.remove('hs-item-open');
    }
  }

  private toggleSubOpen(el: Element) {
    el.classList.toggle('hs-item-open');
    this.toggleSubMenu();
  }

  private handleResize() {
    if (window.innerWidth < 768 && !this.isMobileView) {
      this.isMobileView = true;
      this.manageMenuLinks();
    } else if (window.innerWidth >= 768 && this.isMobileView) {
      this.isMobileView = false;
      if (this.isMenuOpen) this.toggleMenu();
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

  private manageMenuLinks(teardown?: Boolean) {
    const hsMenuLinks = document.querySelectorAll('[slot="main-menu"] li.hs-menu-depth-1.hs-item-has-children');
    hsMenuLinks.forEach((link) => {
      if (this.isMobileView) this.menuLinkClickHandler(link);
      else this.menuLinkClickHandler(link, teardown || true);
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('keyup', (ke: KeyboardEvent) => {
      if (ke.key === 'Escape' && this.isMenuOpen) this.toggleMenu();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.manageMenuLinks(true);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('keyup', (ke: KeyboardEvent) => {
      if (ke.key === 'Escape' && this.isMenuOpen) this.toggleMenu();
    });
  }

  protected render() {
    return html`
      <kps-container padding-x="lg">
        <nav theme="${this.theme}" isMobileView="${this.isMobileView}" isMenuOpen="${this.isMenuOpen}" isSubMenuOpen="${this.isSubMenuOpen}">
          <kps-icon class="back" icon="chevron" @click="${this.toggleSubMenu}"></kps-icon>

          <a class="logo" href="/">
            <img src="${this.logoImg.src}" alt="${this.logoImg.alt}" />
          </a>

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
