import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import styles from './Stepper.css?inline';

@customElement('kps-stepper')
export default class Stepper extends LitElement {
  static styles = unsafeCSS(styles);

  @property()
    steps = [];

  @property()
    activeStep = undefined;

  @property({ type: Boolean })
    visible = false;

  wrapRef = createRef();

  animationRef = createRef();

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
    const wrapEl = this.wrapRef.value as HTMLElement;
    const animationEl = this.animationRef.value as HTMLElement;

    if (!wrapEl || !animationEl) return;

    const itemHeight = window.innerHeight;
    const scrollLength = wrapEl.offsetHeight - itemHeight;
    const { top } = wrapEl.getBoundingClientRect();
    const containerFromTop = scrollLength - (scrollLength + top);
    let scrollPercent = containerFromTop / scrollLength;

    if (scrollPercent < 0) {
      scrollPercent = 0;
    }
    if (scrollPercent > 1) {
      scrollPercent = 1;
    }

    if (scrollPercent >= 1) {
      if (this.visible) {
        this.visible = false;
        setTimeout(() => {
          animationEl.style.position = 'absolute';
        }, 250);
      }
    } else if (scrollPercent <= 0) {
      animationEl.style.position = 'absolute';
    } else {
      animationEl.style.position = 'fixed';
      this.visible = true;
    }

    wrapEl.style.setProperty('--sp', `${scrollPercent}`);

    let activeStep = this.steps[0];
    const stepCount = this.steps.length;
    const stepPercent = scrollPercent * stepCount;
    if (stepCount > 1) {
      activeStep = this.steps[Math.floor(stepPercent)];
      if (!activeStep) return;
    }

    if (this.activeStep !== activeStep) this.activeStep = activeStep;
  };

  render() {
    return html`
      <div class="wrap" ${ref(this.wrapRef)}>
        <div class="animation ${this.visible ? 'visible' : ''}" ${ref(this.animationRef)}>
          <div class="images">
            ${this.steps.map((step: { image: string, title: string }) => html`
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
    `;
  }
}
