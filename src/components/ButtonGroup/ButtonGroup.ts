import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('kps-button-group')
export default class ButtonGroup extends LitElement {
  @property({ type: String })
  private direction: 'row' | 'column' = 'row';

  static styles = css`
    .wrap {
      display: inline-flex;
    }

    .wrap ::slotted(*) {
      margin-right: 0.5rem;
    }

    .wrap ::slotted(:last-child) {
      margin-right: 0;
    }

    .wrap[direction=column] {
      flex-direction: column;
    }

    .wrap[direction=column] ::slotted(*) {
      margin-bottom: 0.5rem;
    }

    .wrap[direction=column] ::slotted(:last-child) {
      margin-bottom: 0;
    }
  `;

  render() {
    return html`
      <div class="wrap" direction="${this.direction}">
        <slot></slot>
      </div>
    `;
  }
}
