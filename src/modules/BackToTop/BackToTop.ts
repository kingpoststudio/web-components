import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('back-to-top')
export default class BackToTop extends LitElement {
  @property({ type: String }) icon = 'chevron-up';

  static styles = css`
    :host {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      z-index: 100;
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
  `;

  static scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  render() {
    return html`
      <div class="wrap" @click=${BackToTop.scrollToTop}>
        <kps-icon icon="chevron"></kps-icon>
      </div>
    `;
  }
}
