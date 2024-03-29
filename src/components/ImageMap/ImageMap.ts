import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';

interface Point {
  x: number;
  y: number;
  tag: string;
  href: string;
  position: string;
}

const styles = css`
  .wrap {
    position: relative;
    width: fit-content;
    min-width: 100%;
    height: 100%;
  }

  .wrap[emphasized="true"] > .point {
    opacity: 0.1;
  }

  .is-hidden {
    display: none !important;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  img[size="contain"] {
    object-fit: contain;
  }

  .point {
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out, opacity 0.3s ease-in-out;
    background: var(--radial-gradient-tertiary);
  }

  .point:hover,
  .wrap[emphasized="true"] > .point:hover,
  .wrap[emphasized="true"] > .point.emphasized {
    opacity: 1;
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

  .point.to-left > .tag {
    left: -100%;
    top: 50%;
    transform: translate(calc(-100% + 1.8rem), -50%);
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
  .point:hover > .arrow,
  .point.emphasized > .tag,
  .point.emphasized > .arrow {
    opacity: 0.9;
  }
`;

function goToHref(e: any) {
  const href = e.target.getAttribute('href');
  if (href) window.location.href = href;
}

@customElement('kps-image-map')
export default class ImageMap extends LitElement {
  static styles = styles;

  imageMapRef = createRef<HTMLDivElement>();

  @property({ type: String })
  private image: string = '';

  @property({ type: String })
  private imageSize: 'cover' | 'contain' = 'cover';

  @property({ type: Array })
  private points: Array<Point> = [];

  @property({ type: Boolean })
  private emphasized = false;

  constructor() {
    super();
    this.repositionTags = this.repositionTags.bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('resize', this.repositionTags);

    window.addEventListener('tabGroupLinkEmphasized', (e) => {
      const emphasizedHref = (e as any).detail.href;
      const point = this.imageMapRef.value?.querySelector(`.point[href="${emphasizedHref}"]`);

      if (point) {
        this.emphasized = true;
        point.classList.add('emphasized');
      }
    });

    window.addEventListener('tabGroupLinkDeEmphasized', () => {
      this.emphasized = false;
      this.imageMapRef.value?.querySelectorAll('.point').forEach((point) => point.classList.remove('emphasized'));
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.repositionTags);
  }

  firstUpdated() {
    this.repositionTags();
  }

  toggleEmphasized() {
    this.emphasized = !this.emphasized;
    const point = this.imageMapRef.value?.querySelector('.point:hover');

    if (this.emphasized) {
      this.dispatchEvent(new CustomEvent('imageMapPointEmphasized', {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: { point },
      }));
    } else {
      this.dispatchEvent(new CustomEvent('imageMapPointDeEmphasized', {
        bubbles: true,
        cancelable: false,
        composed: true,
      }));
    }
  }

  repositionTags() {
    const points = this.shadowRoot?.querySelectorAll('.point');

    points?.forEach((point) => {
      if (!point) return;

      const tag = point.querySelector('.tag') as HTMLElement;
      const position = point.getAttribute('position') as string;

      if (tag) {
        tag.style.left = '';
        point.classList.remove('to-top', 'to-bottom');
        if (position) point.classList.add(`to-${position}`);

        let tagBounds = tag.getBoundingClientRect();
        const mapBounds = this.imageMapRef.value?.getBoundingClientRect();

        if (tagBounds && mapBounds) {
          const exceedsTop = tagBounds.top < mapBounds?.top;
          const exceedsLeft = tagBounds.left < mapBounds?.left;
          const exceedsRight = tagBounds.right > mapBounds?.right;

          if (exceedsLeft) {
            if (position) point.classList.remove(`to-${position}`);
            point.classList.add('to-right');
          } else if (exceedsRight) {
            const exceedsBottom = tagBounds.bottom + tagBounds.height > mapBounds.bottom;

            if (exceedsBottom) {
              if (position) point.classList.remove(`to-${position}`);
              point.classList.add('to-top');
            } else if (!exceedsBottom || exceedsTop) {
              if (position) point.classList.remove(`to-${position}`);
              point.classList.add('to-bottom');
            }

            tagBounds = tag.getBoundingClientRect();
            if (tagBounds.right > mapBounds.right) {
              tag.style.left = `calc(50% - ${tagBounds.right - mapBounds.right}px)`;
            } else if (tagBounds.left < mapBounds.left) {
              tag.style.left = `calc(50% + ${mapBounds.left + tagBounds.left}px)`;
            }
          } else if (exceedsTop) {
            if (position) point.classList.remove(`to-${position}`);
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
      <div class="wrap" emphasized="${this.emphasized}" ${ref(this.imageMapRef)}>
        <img src="${this.image}" size="${this.imageSize}" />
        ${this.points?.length && this.points.map((point) => html`
        <div 
          class="point"
          href="${point.href}"
          style="left:${point.x}%;top:${point.y}%;"
          position="${point.position}"
          @click="${goToHref}"
          @mouseenter=${this.toggleEmphasized}
          @mouseleave=${this.toggleEmphasized}
        >
          ${point.tag && html`<div class="tag">${point.tag}</div><div class="arrow is-hidden"></div>`}
        </div>
        `)}
      </div>
    `;
  }
}
