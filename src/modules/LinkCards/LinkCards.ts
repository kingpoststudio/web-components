import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('kps-link-cards')
export default class LinkCards extends LitElement {
  static styles = css`
    :host {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: var(--page-max-width);
      margin: 0 auto;
      padding: var(--space-2xl) var(--space-lg);
      box-sizing: border-box;
    }
  `;

  render() {
    return html`
      <div class="link-cards">
        <slot name="cards"></slot>
      </div>
    `;
  }
}
