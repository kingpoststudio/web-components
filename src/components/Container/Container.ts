import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('kps-container')
export default class Container extends LitElement {
  static styles = css`
  :host {
    display: block;
    margin: 0 auto;
    width: 100%;
    max-width: var(--page-max-width);
    box-sizing: border-box;
  }

  :host([padding-x]) {
    padding-left: var(--space);
    padding-right: var(--space);
  }

  :host([padding-y]) {
    padding-top: var(--space);
    padding-bottom: var(--space);
  }

  :host([padding-x=md]) {
    padding-left: var(--space-md);
    padding-right: var(--space-md);
  }

  :host([padding-y=md]) {
    padding-top: var(--space-md);
    padding-bottom: var(--space-md);
  }

  :host([padding-x=lg]) {
    padding-left: var(--space-lg);
    padding-right: var(--space-lg);
  }

  :host([padding-y=lg]) {
    padding-top: var(--space-lg);
    padding-bottom: var(--space-lg);
  }

  :host([padding-x=xl]) {
    padding-left: var(--space-xl);
    padding-right: var(--space-xl);
  }

  :host([padding-y=xl]) {
    padding-top: var(--space-xl);
    padding-bottom: var(--space-xl);
  }

  :host([padding-x=2xl]) {
    padding-left: var(--space-2xl);
    padding-right: var(--space-2xl);
  }

  :host([padding-y=2xl]) {
    padding-top: var(--space-2xl);
    padding-bottom: var(--space-2xl);
  }

  :host([full-width]) {
    max-width: 100%;
  }
`;

  @property({ type: String, attribute: 'padding-x' })
    paddingX = '';

  @property({ type: String, attribute: 'padding-y' })
    paddingY = '';

  @property({ type: Boolean, attribute: 'full-width' })
    fullWidth = false;

  protected render() {
    return html`<slot></slot>`;
  }
}
