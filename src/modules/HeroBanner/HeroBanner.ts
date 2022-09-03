import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const styles = css`
  .wrap {
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    width: 100%;
    height: auto;
    background: transparent;
  }

  .wrap > .image {
    width: 100%;
    height: 100%;
  }

  .wrap > .image > img.bg {
    display: none;
  }

  .wrap[condensed=true] kps-container {
    min-height: 32rem;
  }

  kps-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 45rem;
  }

  kps-container > * {
    margin-bottom: var(--space);
  }

  kps-container > *:last-child {
    margin-bottom: 0;
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

  kps-container > .ctas ::slotted(kps-button) {
    display: inline-flex;
    margin-top: var(--space-xl);
  }

  kps-container > .extra {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
  }


  kps-container img.logo {
    width: 14rem;
    margin-bottom: 3rem;
  }

  @media (min-width: 768px) {
    .wrap > .image {
      position: absolute;
      bottom: 0;
      left: 0;
    }

    .wrap > .image > img.bg-mobile {
      display: none;
    }

    .wrap > .image > img.bg {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center bottom;
    }

    .wrap[contained=true] > .image > img.bg {
      object-fit: contain;
    }
  }

  @media (min-width: 1536px) {
    .wrap > .image > img.bg {
      object-fit: contain;
    }
  }
`;

@customElement('kps-hero')
class HeroBanner extends LitElement {
  static styles = styles;

  @property({ type: Object })
    logoImg = { src: '', alt: '' };

  @property({ type: Object })
    bgImg = { src: '', alt: '' };

  @property({ type: Object })
    mobileImg = { src: '', alt: '' };

  @property({ type: Boolean })
    condensed = false;

  @property({ type: Boolean })
    contained = false;

  render() {
    return html`
      <div class="wrap" condensed="${this.condensed}" contained="${this.contained}">
        <div class="image">
          <img class="bg" src="${this.bgImg.src}" alt="${this.bgImg.alt}" />
          <img class="bg-mobile" src="${this.mobileImg.src}" alt="${this.mobileImg.alt}" />
        </div>

        <kps-container padding-x="lg">
          ${this.logoImg.src && html`<img class="logo" src="${this.logoImg.src}" alt="${this.logoImg.alt}" />`}
          <div class="title"><slot name="title"></slot></div>
          <div class="subtitle"><slot name="subtitle"></slot></div>
          <div class="tagline"><slot name="tagline"></slot></div>

          <kps-button-group class="ctas">
            <slot name="primary-cta"></slot>
            <slot name="secondary-cta"></slot>
          </kps-button-group>

          <div class="extra">
            <slot name="extra"></slot>
          </div>
        </kps-container>
      </div>
    `;
  }
}

export default HeroBanner;
