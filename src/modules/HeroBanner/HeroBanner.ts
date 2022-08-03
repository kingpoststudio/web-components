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
    width: 100%;
    max-width: var(--page-max-width);
    margin: 0 auto;
  }
  
  .content > kps-container {
    display: inline-flex;
    flex-direction: column;
  }

  .content > kps-container > * {
    margin-bottom: 0.75rem;
  }

  .content > kps-container > *:last-child {
    margin-bottom: 0;
  }

  .content > kps-container > .ctas {
    margin-top: 3rem;
  }

  .content > kps-container > .title ::slotted(h1) {
    display: flex;
    margin: 0;
    font-family: var(--font-heading);
    font-size: var(--font-size-8xl);
    font-weight: var(--font-weight-light);
    line-height: 1;
    color: var(--color-secondary-lighter);
  }

  .content > kps-container > .subtitle ::slotted(h2) {
    font-family: var(--font-heading);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-light);
    color: var(--color-secondary-lighter);
    margin: 0;
  }

  .content > kps-container > .tagline ::slotted(p) {
    color: var(--color-white);
  }

  .content > kps-container img.logo {
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
          <kps-container x-padding>
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
      </div>
    `;
  }
}

export default HeroBanner;
