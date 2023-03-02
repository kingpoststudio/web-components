import Flickity from 'flickity';
import { html, css, unsafeCSS, LitElement, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import flickityStyles from 'flickity/css/flickity.css?inline';

const styles = css`
  .flickity-viewport {
    height: 100%;
  }

  .flickity-prev-next-button {
    width: 2rem;
    height: 100%;
    border-radius: 0;
    background: rgba(255,255,255,0.2);
    transition: background 0.2s ease;
  }

  .flickity-prev-next-button:hover {
    background: rgba(255,255,255,0.4);
  }

  .flickity-prev-next-button.previous {
    left: 0;
  }

  .flickity-prev-next-button.next {
    right: 0;
  }

  .flickity-page-dots {
    bottom: 2rem;
  }

  .flickity-page-dot {
    transition: background 0.2s ease;
  }

  .flickity-page-dot.is-selected {
    background: #fff;
  }
`;

@customElement('kps-carousel')
export default class Carousel extends LitElement {
  static styles = [unsafeCSS(flickityStyles), styles] as CSSResultGroup;

  carousel: Flickity | null = null;

  slides: Element[] = [];

  @property({ type: Number })
    autoplay: number = 6000;

  private setSlides() {
    const slides = Array.from(this.children).map((child) => child);
    this.slides = slides || [];
  }

  private generateNewCarousel() {
    this.setSlides();

    const options = {
      autoPlay: this.autoplay,
      contain: true,
      wrapAround: true,
      selectedAttraction: 0.25,
      friction: 1,
    };

    const targetEl = this.shadowRoot?.querySelector('#carousel');

    if (targetEl) {
      this.carousel = new Flickity(targetEl, options);
      this.carousel.append(this.slides);
      this.carousel.resize();
    }
  }

  constructor() {
    super();
    this.generateNewCarousel = this.generateNewCarousel.bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('load', () => this.generateNewCarousel());
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('load', () => this.generateNewCarousel());
  }

  render() {
    return html`<div id="carousel"></div>`;
  }
}
