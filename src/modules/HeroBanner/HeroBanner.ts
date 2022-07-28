import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('kps-hero')
class HeroBanner extends LitElement {
  static styles = css`
    .wrap {
      width: 100%;
      height: auto;
      min-height: 40rem;
      background: var(--color-primary);
    }

    h1 {
      font-size: var(--font-size-7xl);
      font-weight: var(--font-weight-light);
      margin: 0;
    }
  `;

  @property({ type: String })
  public iconSrc = '';

  @property({ type: String })
  public imgSrc = '';

  render() {
    return html`
      <div class="wrap">
        <div class="kps-hero__content">
          <img src="${this.iconSrc}" />
          <h1><slot name="title"></slot></h1>
          <h2><slot name="subtitle"></slot></h2>
          <p><slot name="tagline"></slot></p>
        </div>
      </div>
    `;
  }
}

export default HeroBanner;
