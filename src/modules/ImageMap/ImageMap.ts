import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface Point {
  x: number;
  y: number;
}

const styles = css`
  .point {
    position: absolute;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out;
    background: var(--radial-gradient-tertiary);
  }

  .point:hover {
    box-shadow: 0 0 0.8rem 0.4rem var(--color-tertiary-lightest);
    background-color: var(--color-tertiary-light);
  }
`;

@customElement('kps-image-map')
export default class ImageMap extends LitElement {
  static styles = styles;

  @property({ type: String })
  private image: string = '';

  @property({ type: Array })
  private points: Array<Point> = [];

  updated() {
    console.log(this.points);
  }

  render() {
    return html`
      <div class="wrap">
        <img src="${this.image}" />
        ${this.points?.length && this.points.map((point) => html`
          <div class="point" style="left: ${point.x}%; top: ${point.y}%;"></div>
        `)}
      </div>
    `;
  }
}
