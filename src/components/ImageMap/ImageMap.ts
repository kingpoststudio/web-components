import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

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
    left: 50%;
    transform: translate(-50%, 0);
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
        let isOutside = tag.getBoundingClientRect().right > this.getBoundingClientRect().right;
        if (isOutside && !point.classList.contains('to-bottom')) point.classList.add('to-bottom');
        else if (point.classList.contains('to-bottom')) {
          point.classList.remove('to-bottom');
          isOutside = tag.getBoundingClientRect().right > this.getBoundingClientRect().right;
          if (isOutside) point.classList.add('to-bottom');
        }
      }
    });
  }

  firstUpdated() {
    this.repositionTags();
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('resize', this.repositionTags);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.repositionTags);
  }

  render() {
    return html`
      <div class="wrap">
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
