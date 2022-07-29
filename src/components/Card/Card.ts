import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('kps-card')
export default class Card extends LitElement {
  @property({ type: String })
    variant: 'fill' | 'outline' = 'fill';

  @property({ type: Boolean })
    round = false;

  static styles = css`
    .wrap {
      display: inline-flex;
      position: relative;
      margin: 0.25rem;
      z-index: 1;
    }

    .wrap > a {
      min-width: 6rem;
      padding: 0.5rem 1rem;
      color: var(--color-white);
      background: var(--color-primary);
      font-weight: 500;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      transition: all var(--ease-time) var(--ease-type);
    }

    .wrap[round] {
      border-radius: 0.5rem;
    }
  `;

  render() {
    return html`
      <div class="wrap"
        variant=${this.variant}
        round=${this.round}
      >
      </div>
    `;
  }
}
