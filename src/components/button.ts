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
    :host {
    }

    .wrap {
      display: inline-block;
      position: relative;
      border-radius: inherit;
      box-shadow: 0px 0px 0px 1px transparent;
      cursor: pointer;
      z-index: 1;
    }
  `;

  renderMarkup() {
    if (this.href) {
      return html`
        <a href=${this.href} target=${this.target}>
          <slot></slot>
        </a>
      `;
    }

    return html`
      <button>
        <slot></slot>
      </button>
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
