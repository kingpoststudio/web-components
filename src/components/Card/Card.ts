import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('kps-card')
export default class Card extends LitElement {
  @property({ type: String })
    variant: 'default' = 'default';

  @property({ type: String })
    fontColor: 'primary' | 'secondary' = 'primary';

  @property({ type: Boolean })
    round = false;

  @property({ type: Object })
    img = { src: 'https://picsum.photos/390/200', alt: 'Card image' };

  @property({ type: String })
    title: string = 'Card';

  @property({ type: String })
    description: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  @property({ type: String })
    link: string = '#';

  @property({ type: String })
    linkText: string = 'Read more';

  static styles = css`
    .wrap {
      display: block;
      max-width: 28rem;
    }

    .wrap[round] {
      border-radius: 0.5rem;
    }

    .wrap > img {
      width: 100%;
      height: 12rem;
      object-fit: cover;
    }

    .wrap > .content {
      padding: 1rem 0;
    }

    .wrap[fontColor="primary"] > .content {
      color: var(--color-primary-darker);
    }

    .wrap[fontColor="secondary"] > .content {
      color: var(--color-secondary-darker);
    }

    .wrap > .content > * {
      margin-bottom: 1rem;
    }

    .wrap > .content > *:last-child {
      margin-bottom: 0;
    }

    .wrap > .content > h2 {
      font-family: var(--font-heading);
      font-size: var(--font-size-2xl);
      margin-top: 0;
    }

    .wrap > .content > p {
      line-height: 1.5;
    }

    .wrap > .content > a {
      position: relative;
      display: inline-block;
      color: var(--color-primary);
      text-decoration: none;
      transition: color var(--ease-time) var(--ease-type);
    }

    .wrap > .content > a::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      display: inline-block;
      width: 0;
      height: 1px;
      background: var(--color-primary-light);
      transition: width var(--ease-time) var(--ease-type);
    }

    .wrap > .content > a:hover {
      color: var(--color-primary-light);
    }

    .wrap > .content > a:hover::after {
      width: 100%;
    }
  `;

  render() {
    return html`
      <div class="wrap"
        variant=${this.variant}
        round=${this.round}
        fontColor=${this.fontColor}
      >
        <img src="${this.img.src}" alt="${this.img.alt}">
        <div class="content">
          <h2>${this.title}</h2>
          <p>${this.description}</p>
          ${this.link ? html`<a href=${this.link}>${this.linkText}</a>` : ''}
        </div>
      </div>
    `;
  }
}
