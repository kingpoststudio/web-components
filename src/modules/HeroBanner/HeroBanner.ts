import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('kps-hero')
class HeroBanner extends LitElement {
  @property({ type: String })
    variant: 'fill' | 'outline' = 'fill';

  @property({ type: String })
    color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' = 'primary';

  @property({ type: Boolean })
    rounded = false;

  @property({ type: String })
    href = '';

  @property({ type: String })
    target = '';

  static styles = css`
    .wrap {
      width: 100%;
      height: auto;
      min-height: 40rem;
      background: var(--color-primary);
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
        rounded=${this.rounded}
      >
        ${this.renderMarkup()}
      </div>
    `;
  }
}

export default HeroBanner;
