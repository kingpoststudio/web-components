import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const styles = css`
  :host([x-padding]) {
    padding-left: var(--space-lg);
    padding-right: var(--space-lg);
  }

  :host([y-padding]) {
    padding-top: var(--space-lg);
    padding-bottom: var(--space-lg);
  }
`;

@customElement('kps-container')
export default class Container extends LitElement {
  static styles = styles;

  @property({ type: Boolean, reflect: true, attribute: 'x-padding' })
  xPadding = false;

  @property({ type: Boolean, reflect: true, attribute: 'y-padding' })
  yPadding = false;

  protected render() {
    return html`<slot></slot>`;
  }
}
