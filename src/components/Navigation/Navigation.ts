import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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

  @property({ type: Object })
  public logoImg = { src: '', alt: '' };

  protected render() {
    return html`
      <kps-container padding-x="lg">
        <nav>
          <img class="logo" src="${this.logoImg.src}" alt="${this.logoImg.alt}" />
          <slot name="main-menu"></slot>
          <div class="right-menu">
            <slot name="cta"></slot>
            <kps-icon class="hamburger" icon="hamburger"></kps-icon>
          </div>
        </nav>
      </kps-container>
    `;
  }
}
