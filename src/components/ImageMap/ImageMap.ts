import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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
  }

  img {
    width: 100%;
    height: 100%;
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

  .tag {
    opacity: 0;
    position: relative;
    top: 50%;
    left: 3rem;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0;
    height: auto;
    padding: 0.5rem;
    background: var(--color-white);
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.3), 0 4px 6px -4px rgba(0,0,0,.3);
    overflow: hidden;
    font-size: 1.125rem;
    white-space: nowrap;
    pointer-events: none;
    transition: width 0.2s ease-in-out, opacity 0.2s ease-in-out;
  }

  .arrow {
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 2.5rem;
    transform: translateY(-50%);
    border-top: 0.5rem solid transparent;
    border-bottom: 0.5rem solid transparent;
    border-right: 0.5rem solid var(--color-white);
    pointer-events: none;
    transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
  }

  .point:hover > .tag {
    opacity: 1;
    width: 12rem;
  }

  .point:hover > .arrow {
    opacity: 1;
  }
`;

@customElement('kps-image-map')
export default class ImageMap extends LitElement {
  static styles = styles;

  @property({ type: String })
  private image: string = '';

  @property({ type: Array })
  private points: Array<Point> = [];

  render() {
    return html`
      <div class="wrap">
        <img src="${this.image}" />
        ${this.points?.length && this.points.map((point) => html`
        <div class="point" style="left:${point.x}%;top:${point.y}%;" href="${point.href}">
          ${point.tag && html`<div class="tag">${point.tag}</div><div class="arrow"></div>`}
        </div>
        `)}
      </div>
    `;
  }
}
