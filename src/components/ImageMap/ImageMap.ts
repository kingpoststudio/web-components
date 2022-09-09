import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';

interface Point {
  x: number;
  y: number;
  tag: string;
  href: string;
}

const styles = css`
  .wrap {
    position: relative;
    width: fit-content;
    height: 32rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .point {
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out;
    background: var(--radial-gradient-tertiary);
  }

  .point:hover {
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.3), 0 4px 6px -4px rgba(0,0,0,.3);
    background-color: var(--color-tertiary-light);
  }

  .point > .tag {
    opacity: 0;
    position: relative;
    top: 50%;
    left: 3.5rem;
    z-index: 1;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15rem;
    height: auto;
    padding: 0.5rem;
    overflow: hidden;
    background: var(--color-white);
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.3), 0 4px 6px -4px rgba(0,0,0,.3);
    color: var(--color-text);
    font-size: 1.125rem;
    text-align: center;
    pointer-events: none;
    transition: opacity 0.2s ease-in-out;
  }

  .point.to-bottom > .tag {
    top: calc(100% + 0.725rem);
    transform: translate(-50%, 0);
    left: 50%;
  }

  .point.to-top > .tag {
    top: calc(-100% - 5.275rem);
    transform: translate(-50%, 0);
    left: 50%;
  }

  .point > .arrow {
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 3rem;
    z-index: 1;
    transform: translateY(-50%);
    border-top: 0.5rem solid transparent;
    border-bottom: 0.5rem solid transparent;
    border-right: 0.5rem solid var(--color-white);
    pointer-events: none;
    transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
  }

  .point.to-bottom > .arrow {
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0) rotate(90deg);
  }

  .point.to-top > .arrow {
    top: -1rem;
    left: 50%;
    transform: translate(-50%, 0) rotate(-90deg);
  }

  .point:hover > .tag,
  .point:hover > .arrow {
    opacity: 1;
  }
`;

function goToHref(href: string) {
  if (href) window.location.href = href;
}

@customElement('kps-image-map')
export default class ImageMap extends LitElement {
  static styles = styles;

  imageMapRef = createRef<HTMLDivElement>();

  @property({ type: String })
  private image: string = '';

  @property({ type: Array })
  private points: Array<Point> = [];

  constructor() {
    super();
    this.repositionTags = this.repositionTags.bind(this);
  }

  private repositionTags() {
    const points = this.shadowRoot?.querySelectorAll('.point');

    points?.forEach((point) => {
      const tag = point.querySelector('.tag') as HTMLElement;

      if (tag) {
        let tagBounds = tag.getBoundingClientRect();
        const mapBounds = this.imageMapRef.value?.getBoundingClientRect();

        if (tagBounds && mapBounds) {
          if (tagBounds.right > mapBounds.right) {
            const exceedsBottom = tagBounds.bottom + tagBounds.height > mapBounds.bottom;

            if (exceedsBottom) point.classList.add('to-top');
            else point.classList.add('to-bottom');

            // Ensure that the repositioned tag is not cut off.
            tagBounds = tag.getBoundingClientRect();
            if (tagBounds.right > mapBounds.right) {
              tag.style.left = `calc(50% - ${tagBounds.right - mapBounds.right}px)`;
            }
          }
        }
      }
    });
  }

  firstUpdated() {
    this.repositionTags();
  }

  render() {
    return html`
      <div class="wrap" ${ref(this.imageMapRef)}>
        <img src="${this.image}" />
        ${this.points?.length && this.points.map((point) => html`
        <div class="point" style="left:${point.x}%;top:${point.y}%;" @click="${() => goToHref(point.href)}">
          ${point.tag && html`<div class="tag">${point.tag}</div><div class="arrow"></div>`}
        </div>
        `)}
      </div>
    `;
  }
}
