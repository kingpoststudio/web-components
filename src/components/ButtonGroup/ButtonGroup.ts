import { html, unsafeCSS, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import Styles from './ButtonGroup.css';

@customElement('kps-button-group')
export default class ButtonGroup extends LitElement {
  static styles = [unsafeCSS(Styles)];

  render() {
    return html`
      <slot></slot>
    `;
  }
}
