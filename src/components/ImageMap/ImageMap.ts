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

  .is-hidden {
    display: none !important;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    background-color: var(--color-tertiary);
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
    width: max-content;
    max-width: 15rem;
    height: auto;
    padding: 0.5rem 0.75rem;
    overflow: hidden;
    border-radius: 0.5rem;
    background: var(--color-tertiary);
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.3), 0 4px 6px -4px rgba(0,0,0,.3);
    color: var(--color-white);
    font-size: 1.125rem;
    text-align: center;
    pointer-events: none;
    transition: opacity 0.2s ease-in-out;
  }

  .point.to-bottom > .tag {
    left: 50%;
    top: 100%;
    transform: translate(-50%, 0.7rem);
  }
  
  .point.to-top > .tag {
    left: 50%;
    top: -100%;
    transform: translate(-50%, calc(-100% + 1.8rem));
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
    border-right: 0.5rem solid var(--color-tertiary);
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
    opacity: 0.9;
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

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('resize', this.repositionTags);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.repositionTags);
  }

  firstUpdated() {
    this.repositionTags();
  }

  repositionTags() {
    const points = this.shadowRoot?.querySelectorAll('.point');

    points?.forEach((point) => {
      const tag = point.querySelector('.tag') as HTMLElement;

      if (tag) {
        tag.style.left = '';
        point.classList.remove('to-top', 'to-bottom');

        let tagBounds = tag.getBoundingClientRect();
        const mapBounds = this.imageMapRef.value?.getBoundingClientRect();

        if (tagBounds && mapBounds) {
          const exceedsRight = tagBounds.right > mapBounds?.right;
          const exceedsTop = tagBounds.top < mapBounds?.top;

          if (exceedsRight) {
            const exceedsBottom = tagBounds.bottom + tagBounds.height > mapBounds.bottom;

            if (exceedsBottom) {
              point.classList.add('to-top');
            } else if (!exceedsBottom || exceedsTop) {
              point.classList.add('to-bottom');
            }

            tagBounds = tag.getBoundingClientRect();
            if (tagBounds.right > mapBounds.right) {
              tag.style.left = `calc(50% - ${tagBounds.right - mapBounds.right}px)`;
            } else if (tagBounds.left < mapBounds.left) {
              tag.style.left = `calc(50% + ${mapBounds.left + tagBounds.left}px)`;
            }
          } else if (exceedsTop) {
            point.classList.add('to-bottom');

            tagBounds = tag.getBoundingClientRect();
            if (tagBounds.left < mapBounds.left) {
              tag.style.left = `calc(50% + ${mapBounds.left - tagBounds.left}px)`;
            }
          }
        }
      }
    });
  }

  render() {
    return html`
      <div class="wrap" ${ref(this.imageMapRef)}>
        <img src="${this.image}" />
        ${this.points?.length && this.points.map((point) => html`
        <div class="point" style="left:${point.x}%;top:${point.y}%;" @click="${() => goToHref(point.href)}">
          ${point.tag && html`<div class="tag">${point.tag}</div><div class="arrow is-hidden"></div>`}
        </div>
        `)}
      </div>
    `;
  }
}
