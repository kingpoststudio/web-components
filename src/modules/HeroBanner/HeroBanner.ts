import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('kps-hero')
class HeroBanner extends LitElement {
  static styles = css`
    .wrap {
      width: 100%;
      height: auto;
      min-height: 40rem;
      background: var(--color-primary);
    }
  `;

  text = html`text`;

  render() {
    return html`
      <div class="wrap">
        ${this.text}
      </div>
    `;
  }
}

export default HeroBanner;
