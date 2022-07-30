import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('kps-card-grid')
export default class CardGrid extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .columns {
      display: flex;
      justify-content: stretch;
      width: 100%;
      grid-gap: var(--space-md);
    }
  `;

  render() {
    return html`
      <div class="columns">
        <slot></slot>
      </div>
    `;
  }
}
