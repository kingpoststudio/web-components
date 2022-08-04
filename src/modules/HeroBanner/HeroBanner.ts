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

  kps-container {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  kps-container > * {
    margin-bottom: var(--space);
  }

  kps-container > *:last-child {
    margin-bottom: 0;
  }

  kps-container > .ctas {
    margin-top: var(--space-xl);
  }

  kps-container > .title ::slotted(h1) {
    display: flex;
    margin: 0;
    font-family: var(--font-heading);
    font-size: var(--font-size-8xl);
    font-weight: var(--font-weight-light);
    line-height: 1;
    color: var(--color-secondary-lighter);
  }

  kps-container > .subtitle ::slotted(h2) {
    font-family: var(--font-heading);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-light);
    color: var(--color-secondary-lighter);
    margin: 0;
  }

  kps-container > .tagline ::slotted(p) {
    color: var(--color-white);
  }

  kps-container img.logo {
    width: 14rem;
    margin-bottom: 3rem;
  }

  img.bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: 1440px) {
    img.bg {
      object-fit: none;
    }
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

        <kps-container padding-x full-width>
          <img class="logo" src="${this.logoImg.src}" alt="${this.logoImg.alt}" />
          <div class="title"><slot name="title"></slot></div>
          <div class="subtitle"><slot name="subtitle"></slot></div>
          <div class="tagline"><slot name="tagline"></slot></div>

          <div class="ctas">
            <slot name="primary-cta"></slot>
            <slot name="secondary-cta"></slot>
          </div>
        </kps-container>
      </div>
    `;
  }
}

export default HeroBanner;
