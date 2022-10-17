import { html, unsafeCSS, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import Styles from './Pagination.css';

@customElement('kps-pagination')
export default class Pagination extends LitElement {
  static styles = [unsafeCSS(Styles)];

  @state()
  private isMenuOpen = false;

  @state()
  private isSubMenuOpen = false;

  @state()
  private isMobileView = window.innerWidth < 768;

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
      <div>
        <nav aria-label="Pagination" role="navigation">
          <a
            class="block"
            @click=${() => { }}
            rel="prev"
            role="button"
            aria-label="Go to first page"
          >
            <svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 14">
              <polygon points="0 6 6.5 14 13 6 10.87 6 6.5 11.43 2.06 6 0 6"/>
              <polygon points="0 0 6.5 8 13 0 10.87 0 6.5 5.43 2.06 0 0 0"/>
            </svg>
          </a>
          <a
            class="block"
            @click=${() => { }}
            rel="prev"
            role="button"
            aria-label="Go to previous page"
          >
            <svg class="arrow prev-page" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 8">
              <polygon points="0 0 6.5 8 13 0 10.87 0 6.5 5.43 2.06 0 0 0"/>
            </svg>
          </a>
          ${Array.from({ length: 6 }, (_, i) => i - 2).map((i) => html`
            <a
              class="block"
              @click=${() => { }}
              aria-label="Go to page ${i}"
              aria-current=${i === 0 ? 'page' : 'false'}
              role="button"
            >
              ${i}
            </a>
          `)}
          <a
              class="block"
              @click=${() => { }}
              rel="next"
              role="button"
              aria-label="Go to next page"
          >
            <svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 8">
              <polygon class="cls-1" points="0 0 6.5 8 13 0 10.87 0 6.5 5.43 2.06 0 0 0"/>
            </svg>
          </a>
          <a
              class="block"
              @click=${() => { }}
              aria-label="Go to last page"
              role="button"
              rel="last"
          >
            <svg class="arrow last-page" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 14">
              <polygon points="0 6 6.5 14 13 6 10.87 6 6.5 11.43 2.06 6 0 6"/>
              <polygon points="0 0 6.5 8 13 0 10.87 0 6.5 5.43 2.06 0 0 0"/>
            </svg>
          </a>
        </nav>

        <select class="pagination-select-page" onchange="controllers.hubDbPaginationCtrl.goToPage(event.target.value)">
          <option value="" disabled selected>Go to Page</option>
        </select>
      </div>
    `;
  }
}
