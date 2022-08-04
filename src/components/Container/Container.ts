import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const styles = css`
  :host {
    display: block;
    margin: 0 auto;
    max-width: var(--page-max-width);
    box-sizing: border-box;
  }

  :host([padding-x]) {
    padding-left: var(--space-lg);
    padding-right: var(--space-lg);
  }

  :host([padding-y]) {
    padding-top: var(--space-lg);
    padding-bottom: var(--space-lg);
  }

  :host([full-width]) {
    width: 100%;
  }
`;

@customElement('kps-container')
export default class Container extends LitElement {
  static styles = styles;

  @property({ type: Boolean, reflect: true, attribute: 'padding-x' })
    paddingX = false;

  @property({ type: Boolean, reflect: true, attribute: 'padding-y' })
    paddingY = false;

  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
    fullWidth = false;

  protected render() {
    return html`<slot></slot>`;
  }
}
