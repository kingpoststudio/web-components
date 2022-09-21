import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('back-to-top')
export default class BackToTop extends LitElement {
  @property({ type: String }) icon = 'chevron-up';

  @property({ type: Boolean }) shadow = false;

  static styles = css`
    :host {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      z-index: 40;
    }

    .wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      background-color: var(--color-gray);
      color: var(--color-white);
      border-radius: 50%;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }

    .wrap:hover {
      background-color: var(--color-gray-light);
    }

    .wrap[shadow="true"] {
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }
  `;

  static scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  render() {
    return html`
      <div class="wrap" shadow="${this.shadow}" @click=${BackToTop.scrollToTop}>
        <kps-icon icon="chevron"></kps-icon>
      </div>
    `;
  }
}
