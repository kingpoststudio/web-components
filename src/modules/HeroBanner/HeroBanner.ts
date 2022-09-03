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

  .wrap .bg-img,
  .wrap .mobile-img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .wrap .bg-img > img {
    display: none;
  }

  .wrap .mobile-img > img {
    object-fit: cover;
  }

  .wrap[condensed=true] kps-container {
    min-height: 32rem;
  }

  kps-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 36rem;
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
    font-size: 17.5vw;
    font-weight: var(--font-weight-light);
    line-height: 1;
    color: var(--color-secondary-lighter);
  }

  kps-container > .subtitle ::slotted(h2) {
    font-family: var(--font-heading);
    font-size: 4.5vw;
    font-weight: var(--font-weight-light);
    color: var(--color-secondary-lighter);
    line-height: 1.75;
    margin: 0;
  }

  kps-container > .tagline ::slotted(p) {
    color: var(--color-white);
    font-size: 4.5vw;
    margin: 0;
  }

  kps-container > .ctas {
    display: flex;
    flex-direction: column;
    margin-top: var(--space-md);
    margin-left: var(--space);
  }

  kps-container > .ctas ::slotted(kps-button) {
    margin-bottom: var(--space-md);
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
    .wrap {
      flex-direction: row;
    }

    .wrap .mobile-img {
      display: none;
    }

    .wrap .bg-img {
      position: absolute;
      bottom: 0;
      left: 0;
    }

    .wrap .bg-img > img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center bottom;
    }

    .wrap[contained=true] .bg-img > img {
      object-fit: contain;
    }

    kps-container {
      min-height: 45rem;
    }

    kps-container > .title ::slotted(h1) {
      font-size: var(--font-size-8xl);
    }

    kps-container > .subtitle ::slotted(h2) {
      font-size: var(--font-size-2xl);
    }

    kps-container > .tagline ::slotted(p) {
      color: var(--color-white);
      font-size: var(--font-size-xl);
    }

    kps-container > .ctas {
      flex-direction: row;
      margin-top: var(--space-lg);
      margin-left: 0;
    }

    kps-container > .ctas ::slotted(kps-button) {
      margin-right: var(--space-md);
    }

    kps-container > .ctas ::slotted(kps-button:last-child) {
      margin-right: 0;
    }
  }

  @media (min-width: 1536px) {
    .wrap > .bg-img > img {
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
      
        <div class="bg-img">
          <img src="${this.bgImg.src}" alt="${this.bgImg.alt}" />
        </div>

        <kps-container padding-x="lg" padding-y="lg">
          ${this.logoImg.src && html`<img class="logo" src="${this.logoImg.src}" alt="${this.logoImg.alt}" />`}
          <div class="title"><slot name="title"></slot></div>
          <div class="subtitle"><slot name="subtitle"></slot></div>
          <div class="tagline"><slot name="tagline"></slot></div>

          <div class="mobile-img">
            <img src="${this.mobileImg.src}" alt="${this.mobileImg.alt}" />
          </div>

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
