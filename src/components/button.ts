import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('kps-button')
class Button extends LitElement {
  @property({ type: String })
    variant: 'fill' | 'outline' = 'fill';

  @property({ type: String })
    color: 'primary' | 'secondary' | 'warning' | 'error' = 'primary';

  @property({ type: String })
    round = 'false';

  @property({ type: String })
    href = '';

  @property({ type: String })
    target = '';

  static styles = css`
    .wrap {
      display: inline-flex;
      position: relative;
      margin: 0.25rem;
      z-index: 1;
    }

    .wrap > a {
      padding: 0.5rem 1rem;
      color: white;
      background: var(--color-primary);
      text-decoration: none;
      cursor: pointer;
      transition: all var(--ease-time) var(--ease-type);
    }

    .wrap > a:hover {
      background: var(--color-primary-dark);
    }
  `;

  renderMarkup() {
    return html`
      <a href=${this.href} target=${this.target}>
        <slot></slot>
      </a>
    `;
  }

  render() {
    return html`
      <div class="wrap"
        variant=${this.variant}
        color=${this.color}
        round=${this.round}
      >
        ${this.renderMarkup()}
      </div>
    `;
  }
}

export default Button;
