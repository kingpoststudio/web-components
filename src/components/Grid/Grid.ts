import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('kps-grid')
export default class Grid extends LitElement {
  @property({ type: Boolean })
    flex = false;

  @property({ type: Number })
    cols = 3;

  static styles = css`
    :host {
      display: block;
    }

    .wrap {
      display: grid;
    }

    .wrap[flex] {
      display: flex;
      gap: var(--space);
    }
    
    .wrap[flex][cols="2"] {
      flex: 0 1 calc(50% - var(--space));
    }

    .wrap[flex][cols="3"] {
      flex: 0 1 calc(33.33% - var(--space));
    }

    .wrap[flex] ::slotted(*) {
      flex: 1;
    }

  `;

  render() {
    return html`
      <div class="wrap" flex="${this.flex}" cols="${this.cols}">
        <slot></slot>
      </div>
    `;
  }
}
