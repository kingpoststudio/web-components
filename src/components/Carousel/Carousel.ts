import Flickity from 'flickity';
import { html, css, unsafeCSS, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import flickityStyles from 'flickity/css/flickity.css';

const styles = css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
  }
  .flickity-viewport {
    height: 100%;
  }
  .flickity-slider {
    height: 100%;
  }
`;

@customElement('kps-carousel')
export default class Carousel extends LitElement {
  static styles = [css`${unsafeCSS(flickityStyles)}`, styles];

  carousel: Flickity | null = null;

  @query('#carousel')
    target: Element | undefined;

  firstUpdated() {
    this.generateNewCarousel();
  }

  private generateNewCarousel() {
    const options = {
      autoPlay: 6000,
      contain: true,
      wrapAround: true,
      selectedAttraction: 0.25,
      friction: 1,
    };

    if (this.target) {
      this.carousel = new Flickity(this.target, options);
      this.carousel.resize();
    }
  }

  render() {
    return html`
      <div id="carousel">
        <slot></slot>
      </div>
    `;
  }
}
