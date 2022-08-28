// create a new lit-element called "kps-tab" with imports.
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const styles = css`
      :host {
        position: relative;
        display: inline-block;
      }

      a.tab-link {
        padding-bottom: 0.25rem;
        color: var(--color-gray-light);
        font-weight: 500;
        text-decoration: none;
        transition: color var(--ease-time) var(--ease-type);
      }

      a.tab-link:after {
        content: '';
        position: absolute;
        bottom: -0.25rem;
        display: block;
        width: 100%;
        height: 2px;
        background-color: var(--color-transparent);
        transition: background-color var(--ease-time) var(--ease-type);
      }

      a.tab-link:hover,
      a.tab-link[active=true] {
        color: var(--color-black);
      }

      a.tab-link[active=true]:after {
        background-color: var(--color-primary-dark);
      }
    `;
@customElement('kps-tab')
export default class Tab extends LitElement {
  static styles = styles;

  @property({ type: Boolean })
    active = false;

  @property({ type: String })
    href = '';

  render() {
    return html`
      <a class="tab-link" href="${this.href}" active="${this.active}">
        <slot></slot>
      </a>
    `;
  }
}
