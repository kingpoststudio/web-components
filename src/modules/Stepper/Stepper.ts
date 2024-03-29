import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { styleMap } from 'lit/directives/style-map.js';
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
    mobile?: {
      x: number;
      y: number;
    };
  };
  slides: {
    from: number;
    to: number;
  };
}

@customElement('kps-stepper')
export default class Stepper extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ type: Array })
    images: StepImage[] = [];

  @property({ type: Array })
    blocks: StepBlock[] = [];

  @property()
    activeImage: StepImage | undefined;

  @property({ type: Boolean })
    visible = false;

  @property({ type: String })
    speed: 'slow' | 'normal' | 'fast' = 'normal';

  @property({ type: Boolean })
    fade = false;

  @state()
    isMobile = window.innerWidth < 768;

  animationRef = createRef();

  constructor() {
    super();
    this.getBlockContent = this.getBlockContent.bind(this);
    this.getImageContent = this.getImageContent.bind(this);

    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize, { passive: true });

    this.handleScroll();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const { innerWidth } = window;
    this.isMobile = innerWidth < 768;
    this.handleScroll();
  };

  handleScroll = () => {
    const animationEl = this.animationRef.value as HTMLElement;
    const hostEl = this.shadowRoot?.host as HTMLElement;

    if (!animationEl || !hostEl) return;

    const { top } = hostEl.getBoundingClientRect();
    const { innerHeight: windowHeight } = window;
    const scrollLength = hostEl.offsetHeight - windowHeight;
    let scrollPercent = -1 * (top / scrollLength);

    if (scrollPercent < 0) scrollPercent = 0;
    if (scrollPercent > 1) scrollPercent = 1;

    if (scrollPercent > 0) {
      if (scrollPercent === 1) {
        animationEl.style.position = 'absolute';
        animationEl.style.top = 'auto';
        animationEl.style.bottom = '6.5rem';
      } else {
        animationEl.style.position = 'fixed';
        animationEl.style.top = '0';
        animationEl.style.bottom = 'auto';
      }
      if (!this.visible) this.visible = true;
    } else if (this.visible) {
      this.visible = false;
      setTimeout(() => {
        animationEl.style.position = 'absolute';
      }, this.fade ? 250 : 0);
    }

    let activeImage = this.images[0];
    const stepCount = this.images.length;
    const stepPercent = scrollPercent * stepCount;

    if (stepCount > 1) {
      activeImage = this.images[Math.floor(stepPercent)];
      if (!activeImage) return;
    }

    if (this.activeImage !== activeImage) this.activeImage = activeImage;
  };

  getBlockContent(block: StepBlock) {
    const { x, y, mobile } = block.position;
    const activeIndex = this.activeImage ? this.images.indexOf(this.activeImage) : -1;
    const isVisible = block.slides.from <= activeIndex && activeIndex < block.slides.to;
    const blockStyles = {
      left: `${this.isMobile && mobile?.x ? mobile.x : x}%`,
      top: `${this.isMobile && mobile?.y ? mobile.y : y}%`,
    };

    return html`<div class="block ${isVisible ? 'visible' : ''}" style="${styleMap(blockStyles)}">${unsafeHTML(block?.text)}</div>`;
  }

  getImageContent(image: StepImage) {
    const isActive = this.activeImage === image;
    return html`<img class="${isActive ? 'active' : ''}" src="${image?.src}" alt="${image?.alt}" />`;
  }

  render() {
    return html`
      <div class="wrap" speed="${this.speed}">
        <div class="animation ${this.visible ? 'visible' : ''}" ${ref(this.animationRef)}>
          <div class="images">${this.images?.length && this.images.map(this.getImageContent)}</div>
          <div class="blocks">${this.blocks?.length && this.blocks.map(this.getBlockContent)}</div>
        </div>
      </div>
    `;
  }
}
