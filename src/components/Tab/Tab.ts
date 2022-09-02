// create a new lit-element called "kps-tab" with imports.
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const styles = css`
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
