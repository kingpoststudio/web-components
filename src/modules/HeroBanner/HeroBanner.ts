import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('kps-hero')
class HeroBanner extends LitElement {
  static styles = css`
    .wrap {
      display: flex;
      align-items: center;
      width: 100%;
      height: auto;
      min-height: 40rem;
      background: var(--color-black);
    }

    .content {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: var(--page-max-width);
      padding: 0 2rem;
      margin: 0 auto;
    }

    .ctas {
      margin-top: 2rem;
    }

    h1 {
      display: flex;
      margin: 0;
      font-size: var(--font-size-7xl);
      font-weight: var(--font-weight-light);
      line-height: 1;
      color: var(--color-secondary-lighter);
    }

    h2 {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-light);
      color: var(--color-secondary-lighter);
      margin: 0;
    }

    p {
      color: var(--color-white);
    }
  `;

  @property({ type: String })
  public iconSrc = '';

  @property({ type: String })
  public imgSrc = '';

  render() {
    return html`
      <div class="wrap">
        <div class="content">
          <img src="${this.iconSrc}" />
          <h1><slot name="title"></slot></h1>
          <h2><slot name="subtitle"></slot></h2>
          <p><slot name="tagline"></slot></p>

          <div class="ctas">
            <slot name="primary-cta"></slot>
            <slot name="secondary-cta"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

export default HeroBanner;
