// create a new lit-element called "kps-tab" with imports.
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

const styles = css`
  .wrap {
    height: 100%;
  }
`;

@customElement('kps-tab')
export default class Tab extends LitElement {
  static styles = styles;

  render() {
    return html`
      <div class="wrap">
        <slot></slot>
      </div>
    `;
  }
}
