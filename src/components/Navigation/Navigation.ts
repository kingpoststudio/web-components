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

  nav > .nav-menu {
    height: 100%; 
  }

  img.logo {
    position: relative;
    height: 100%;
    max-width: 12rem;
    max-height: 4rem;
    object-fit: contain;  
  }

  .right-menu {
    display: flex;
    align-items: center;
  }

  .right-menu > kps-icon.hamburger {
      margin-left: 2rem;
      cursor: pointer;
    }
  
  @media (min-width: 768px) {
    img.logo {
      max-width: auto;
    }

    .right-menu > kps-icon.hamburger {
      display: none;
    }
  }
`;

@customElement('kps-nav')
export default class Navigation extends LitElement {
  static styles = styles;

  @state()
    isOpen = false;

  @property({ type: Object })
  public logoImg = { src: '', alt: '' };

  private toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  protected render() {
    return html`
      <kps-container padding-x="lg">
        <nav isOpen="${this.isOpen}">
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
