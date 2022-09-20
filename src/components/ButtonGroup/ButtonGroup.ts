import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('kps-button-group')
export default class ButtonGroup extends LitElement {
  static styles = css`
    :host {
      display: flex;
    }
    
    :host([inline]) {
      display: inline-flex;
    }

    :host([direction="column"]) {
      flex-direction: column;
    }

    :host {
      display: flex;
    }

    :host ::slotted(*) {
      margin-right: 0.5rem;
    }

    :host ::slotted(:last-child) {
      margin-right: 0;
    }

    :host([direction="column"]) {
      flex-direction: column;
    }

    :host([direction="column"]) ::slotted(*) {
      margin-bottom: 0.5rem;
    }

    :host([direction="column"]) ::slotted(:last-child) {
      margin-bottom: 0;
    }
  `;

  render() {
    return html`
      <slot></slot>
    `;
  }
}
