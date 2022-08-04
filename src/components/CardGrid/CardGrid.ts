import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('kps-card-grid')
export default class CardGrid extends LitElement {
  static styles = css`
    .columns {
      display: flex;
      justify-content: space-between;
      gap: var(--space-md);
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
