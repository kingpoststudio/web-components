import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const styles = css`
  .wrap {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: auto;
    min-height: 45rem;
    background: var(--color-black);
  }

  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: var(--page-max-width);
    padding: 0 var(--space-2xl);
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

  img.logo {
    width: 14rem;
    margin-bottom: 4rem;
  }

  img.bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: none;
  }
`;

@customElement('kps-hero')
class HeroBanner extends LitElement {
  static styles = styles;

  @property({ type: Object })
  public logoImg = { src: '', alt: '' };

  @property({ type: Object })
  public bgImg = { src: '', alt: '' };

  render() {
    return html`
      <div class="wrap">
        <img class="bg" src="${this.bgImg.src}" alt="${this.bgImg.alt}" />

        <div class="content">
          <img class="logo" src="${this.logoImg.src}" alt="${this.logoImg.alt}" />
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
