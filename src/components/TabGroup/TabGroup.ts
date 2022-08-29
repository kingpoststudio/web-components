import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const styles = css`
  :host {
    position: relative;
    display: inline-flex;
    flex-direction: row;
  }

  :host ::slotted(kps-tab) {
    flex-grow: 1;
    margin: 0 var(--space);
  }

  :host ::slotted(:not(kps-tab)) {
    display: none;
  }

  ::slotted(:first-child) {
    margin-left: 0;
  }

  ::slotted(:last-child) {
    margin-right: 0;
  }
`;

@customElement('kps-tab-group')
export default class TabGroup extends LitElement {
  static styles = styles;

  @property({ type: String, attribute: 'active-tab' })
    activeTab = '';

  render() {
    return html`
      <slot></slot>
    `;
  }
}
