import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('kps-card')
export default class Card extends LitElement {
  @property({ type: String })
    variant: 'base' | 'article' | 'quote' = 'base';

  @property({ type: String })
    color: 'primary' | 'secondary' = 'primary';

  @property({ type: String })
    theme: 'light' | 'dark' = 'light';

  @property({ type: Boolean })
    round = false;

  @property({ type: String })
    title: string = 'Card';

  @property({ type: String })
    description: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  @property({ type: Object })
    link = { label: 'Read more', href: '#', target: '_blank' };

  @property({ type: Object })
    img = { src: '', alt: '' };

  static styles = css`
    .wrap {
      display: block;
    }

    .wrap[round=true] {
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

    .wrap[color=primary] {
      color: var(--color-primary-darker);
    }

    .wrap[color=primary][theme=dark] {
      color: var(--color-white);
      background: var(--color-primary-darkest);
    }

    .wrap[color=secondary] {
      color: var(--color-secondary-darker);
    }

    .wrap[color=secondary][theme=dark] {
      color: var(--color-white);
      background: var(--color-secondary-darkest);
    }

    .wrap > .content > * {
      margin-bottom: 1rem;
    }

    .wrap > .content > *:last-child {
      margin-bottom: 0;
    }

    .wrap > .content > .title > ::slotted(*) {
      font-family: var(--font-heading);
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-semibold);
      margin-top: 0;
    }

    .wrap > .content > .description > ::slotted(*) {
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
      bottom: -2px;
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

    .wrap[variant=quote] > .content {
      padding: 1.5rem 2rem;
      max-width: 16rem;
    }

    .wrap[variant=quote] > .content > .quote {
      margin: 0;
    }

    .wrap[variant=quote] > .content > .quote ::slotted(*) {
      margin: 0;
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-normal);
      font-style: italic;
    }

    .wrap[variant=quote] > .content > .author {
      display: flex;
      justify-content: flex-end;
      margin: 1.5rem 0 0;
    }

    .wrap[variant=quote] > .content > .author ::slotted(*) {
      margin: 0;
      font-size: var(--font-size);
      font-weight: var(--font-weight-normal);
    }
  `;

  get baseContent() {
    return html`
      <div class="img"><slot name="img"></slot></div>
      <div class="content">
        <div class="title"><slot name="title"></slot></div>
        <div class="description"><slot name="description"></slot></div>
        ${this.link.href && this.link.label ? html`<a href=${this.link.href}>${this.link.label}</a>` : html`<slot name="link"></slot>`}
      </div>
    `;
  }

  get quoteContent() {
    return html`
      <div class="content">
        <div class="quote"><slot name="quote"></slot></div>
        <div class="author"><slot name="author"></slot></div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="wrap"
        variant=${this.variant}
        round=${this.round}
        color=${this.color}
        theme=${this.theme}
      >
        ${this.variant === 'base' ? this.baseContent : null}
        ${this.variant === 'quote' ? this.quoteContent : null}
      </div>
    `;
  }
}
