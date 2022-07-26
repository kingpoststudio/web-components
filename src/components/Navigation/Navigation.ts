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
    box-shadow: 0 0.25rem 1rem #DDD;
  }

  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 6rem;
    max-width: var(--page-max-width);
    padding: 0 2rem;
    margin: 0 auto;
  }

  img.logo {
    position: relative;
    height: 100%;
    max-height: 4rem;
  }
`;

@customElement('kps-nav')
export default class Navigation extends LitElement {
  static styles = styles;

  @property({ type: String })
  public logoSrc = '';

  protected render() {
    return html`
      <nav>
        <img class="logo" src="${this.logoSrc}" />
        <slot name="main-menu"></slot>
        <slot name="main-cta"></slot>
      </nav>
    `;
  }
}
