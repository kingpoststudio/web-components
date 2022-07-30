import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('kps-quote-carousel')
export default class LinkCards extends LitElement {
  static styles = css`
    :host {
      display: block;
      max-width: var(--page-max-width);
      margin: 0 auto;
      padding: var(--space-2xl) var(--space-lg);
    }
  `;

  render() {
    return html`
      <div class="quote-carousel">
        <slot name="cards"></slot>
      </div>
    `;
  }
}
