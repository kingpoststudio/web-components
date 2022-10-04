import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { getScrollbarWidth } from '../../utils';
import styles from './Stepper.css?inline';

interface StepImage {
  src: string;
  alt: string;
}

interface StepBlock {
  text: string;
  position: {
    x: number;
    y: number;
  };
  slides: {
    from: number;
    to: number;
  };
}

@customElement('kps-stepper')
export default class Stepper extends LitElement {
  static styles = unsafeCSS(styles);

  @property()
    images: StepImage[] = [];

  @property()
    blocks: StepBlock[] = [];

  @property()
    activeImage: StepImage | undefined;

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

    if (!animationEl.style.width) {
      const scrollbarWidth = getScrollbarWidth();
      animationEl.style.width = `calc(100vw - ${scrollbarWidth}px)`;
    }

    const windowHeight = window.innerHeight;
    const { top } = wrapEl.getBoundingClientRect();
    const scrollLength = wrapEl.offsetHeight - windowHeight;
    const containerFromTop = scrollLength - (scrollLength + top);
    let scrollPercent = 1 - containerFromTop / scrollLength;

    if (scrollPercent < 0) scrollPercent = 0;
    if (scrollPercent > 1) scrollPercent = 1;

    if (scrollPercent > 0) {
      if (scrollPercent === 1) animationEl.style.position = 'absolute';
      else animationEl.style.position = 'fixed';
      if (!this.visible) this.visible = true;
    } else if (this.visible) {
      this.visible = false;
      setTimeout(() => {
        animationEl.style.position = 'absolute';
      }, 250);
    }

    wrapEl.style.setProperty('--sp', `${scrollPercent}`);

    let activeImage = this.images[0];
    const stepCount = this.images.length;
    const stepPercent = scrollPercent * stepCount;
    if (stepCount > 1) {
      activeImage = this.images[Math.floor(stepPercent)];
      if (!activeImage) return;
    }

    if (this.activeImage !== activeImage) this.activeImage = activeImage;
  };

  render() {
    return html`
      <div class="wrap" ${ref(this.wrapRef)}>
        <div class="animation ${this.visible ? 'visible' : ''}" ${ref(this.animationRef)}>
          <div class="images">
            ${this.images.map((image) => html`
            <img class="${this.activeImage === image ? 'active' : ''}" src="${image?.src}" alt="${image?.alt}" />
            `)}
            </div>
          <div class="blocks">
            ${this.blocks.map((block) => {
              const activeIndex = this.activeImage ? this.images.indexOf(this.activeImage) : -1;

              const isVisible = block.slides.from <= activeIndex && activeIndex <= block.slides.to;
              // const { x, y } = block.position;

              return html`
            <h2 class="block ${isVisible ? 'visible' : ''}">${block?.text}</h2>
            `})}
          </div>
        </div>
      </div>
    `;
  }
}
