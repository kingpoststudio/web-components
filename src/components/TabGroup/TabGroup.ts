// Create a lit element that contains multiple <kps-tab> elements.
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

const styles = css`
  :host {
    position: relative;
    display: inline-flex;
    flex-direction: row;
  }

  :host ::slotted(kps-tab) {
    flex-grow: 1;
    margin: 0 var(--space-sm);
  }
`;

@customElement('kps-tab-group')
export default class TabGroup extends LitElement {
  static styles = styles;

  render() {
    return html`
      <slot></slot>
    `;
  }
}
