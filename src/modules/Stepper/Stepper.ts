import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';

const itemScreenHeight = 1;

@customElement('kps-stepper')
export default class Stepper extends LitElement {
  @property()
    steps = [];

  @property()
    activeStep = undefined;

  stepsContainerRef = createRef();

  aniRef = createRef();

  @property({ type: Boolean, reflect: true })
    live = true;

  constructor() {
    super();

    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll, { passive: true });
    this.handleScroll();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  }

  handleScroll = () => {
    const stepsContainer = this.stepsContainerRef.value as HTMLElement;
    const aniContainer = this.aniRef.value as HTMLElement;
    const itemHeight = window.innerHeight;

    if (!stepsContainer || !aniContainer) return;

    if (window.innerWidth <= 1020) {
      aniContainer.style.position = 'relative';
      return;
    }

    const scrollLength = stepsContainer.offsetHeight - itemHeight;
    const { top, bottom } = stepsContainer.getBoundingClientRect();
    const containerFromTop = scrollLength - (scrollLength + top);
    let scrollPercent = containerFromTop / scrollLength;

    // Clamp range to 0-1
    if (scrollPercent < 0) {
      scrollPercent = 0;
    }
    if (scrollPercent > 1) {
      scrollPercent = 1;
    }

    // Set fixed if in view, set absolute if view is outside
    const scrolledBelow = bottom <= itemHeight;
    if (scrollPercent >= 1 || scrollPercent <= 0) {
      aniContainer.style.position = 'absolute';
      aniContainer.style.top = scrolledBelow ? 'auto' : '0';
      aniContainer.style.bottom = !scrolledBelow ? 'auto' : '0';
    } else {
      aniContainer.style.position = 'fixed';
    }

    stepsContainer.style.setProperty('--sp', `${scrollPercent}`);

    // find and set active step
    let activeStep = this.steps[0];
    const stepCount = this.steps.length;
    const stepPercent = scrollPercent * stepCount;
    if (stepCount > 1) {
      activeStep = this.steps[Math.floor(stepPercent)];
      if (!activeStep) return;
    }

    if (this.activeStep !== activeStep) this.activeStep = activeStep;
  };

  static styles = css`
    :host {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 100vw;
      min-height: 100vh;
      padding: 0 0 var(--space-xl);
      margin: 0 auto;
      border: 1px solid red;
      box-sizing: border-box;
    }

    .steps {
      position: relative;
    }

    .ani {
      display: none;
    }

    @media screen and (min-width: 1020px) {
      .ani {
        position: absolute;
        height: 100vh;
        width: 100vw;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
      }

      .live .ani {
        display: block;
      }

      :host(:not([live])) {
        --desktop-aside-opacity: 1;
      }

      .images {
        --size: 50%;
        width: var(--size);
        aspect-ratio: 1;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        overflow: hidden;
        background-image: var(--gradient-sunrise-light);
      }

      .images img {
        transition: opacity 0.4s ease-in-out;
        opacity: 0;
        object-fit: cover;
        width: 100%;
        height: 100%;
        pointer-events: none;
        position: absolute;
      }

      .images img.active {
        opacity: 1;
      }

      .titles {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        max-width: 234px;
        transform: translateY(calc(calc(var(--sp) - 0.5) * -25vh));
        position: absolute;
        left: 1rem;
        top: 0;
        bottom: 0;
      }

      .center {
        position: relative;
        margin: 0 auto;
        max-width: var(--page-max-width);
        height: 100vh;
      }
    }
  `;

  render() {
    return html`
      <section class="${this.live ? 'live' : ''}">
        <div class="steps" ${ref(this.stepsContainerRef)}>
          <div class="ani" ${ref(this.aniRef)}>
            <div class="images">
              ${this.steps.map((step) => html`
                  <img
                    class="${this.activeStep === step ? 'active' : ''}"
                    src="${step.image}"
                    alt="${step.title}"
                  />
                `)}
              </div>
            <div class="headlines">
              ${this.steps.map((step) => html`
                  <div class="step ${this.activeStep === step ? 'active' : ''}">
                    <h2 class="stepTitle">${step.title}</h2>
                  </div>
                `)}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
