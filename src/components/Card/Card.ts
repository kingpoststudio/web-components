import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type CardVariant =
  | 'base'
  | 'article'
  | 'quote'
  | 'post';

const styles = css`
  .wrap {
    display: block;
  }

  .wrap[rounded=true] {
    border-radius: 0.5rem;
  }

  .wrap > .image {
    display: flex;
    width: 100%;
    max-height: 16rem;
  }

  .wrap > .image ::slotted(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin-bottom: 1rem;
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

  .wrap > .content > *:not(:last-child):not(.image) {
    margin-bottom: 1rem;
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

  .wrap[variant=post] {
    padding: 1.5rem;
    background: var(--color-gray-lightest);
  }

  .wrap[variant=post] > .content {
    padding: 0;
  }

  .wrap[variant=post] > .content .image ::slotted(img) {
    width: 100%;
    height: auto;
    max-height: 20rem;
    object-fit: cover;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
  }

  .wrap[variant=post] > .content > .below {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .wrap[variant=post] > .content > .below > .author-section {
    display: flex;
    align-items: center;
    width: 80%;
  }

  .wrap[variant=post] > .content .author ::slotted(*) {
    margin: 0;
    font-weight: semibold;
    font-size: var(--font-size);
    font-weight: var(--font-weight-semibold);
  }

  .wrap[variant=post] > .content .author-image {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin-right: 1rem;
    background: var(--color-primary-darker);
  }

  .wrap[variant=post][color=secondary] > .content .author-image {
    background: var(--color-secondary-darker);
  }

  .wrap[variant=post] > .content .date,
  .wrap[variant=post] > .content .handle {
    margin-right: 0.5rem;
    color: var(--color-primary);
  }

  .wrap[variant=post] > .content .date ::slotted(*),
  .wrap[variant=post] > .content .handle ::slotted(*) {
    margin: 0;
  }

  .wrap[variant=post] > .content .icon {
    color: var(--color-gray-light);
  }

  .inline {
    display: inline-flex;
    align-items: center;
  }
`;

@customElement('kps-card')
export default class Card extends LitElement {
  static styles = styles;

  @property({ type: String })
    variant: CardVariant = 'base';

  @property({ type: String })
    color: 'primary' | 'secondary' = 'primary';

  @property({ type: String })
    theme: 'light' | 'dark' = 'light';

  @property({ type: Boolean })
    rounded = false;

  @property({ type: String })
    title: string = 'Card';

  @property({ type: String })
    description: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  @property({ type: Object })
    link = { label: '', href: '', target: '_blank' };

  get baseContent() {
    return html`
      <div class="image">
        <slot name="image"></slot>
      </div>
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

  get postContent() {
    return html`
      <div class="content">
        <div class="image">
          <slot name="image"></slot>
        </div>

        <div class="description">
          <slot name="description"></slot>
        </div>
        
        <div class="below">
          <div class="author-section">
            <div class="author-image">
              <slot name="author-image"></slot>
            </div>
            <div>
              <div class="author"><slot name="author"></slot></div>
              <div class="inline">
                <div class="handle"><slot name="handle"></slot></div>
                <div class="date"><slot name="date"></slot></div>
              </div>
            </div>
          </div>
          <div class="icon">
            <slot name="icon"></slot>
          </div>
        </div>
      </div>
    `;
  }

  getContent(variant: CardVariant) {
    switch (variant) {
      case 'base':
        return this.baseContent;
      case 'quote':
        return this.quoteContent;
      case 'post':
        return this.postContent;
      default:
        return this.baseContent;
    }
  }

  render() {
    return html`
      <div class="wrap"
        variant=${this.variant}
        rounded=${this.rounded}
        color=${this.color}
        theme=${this.theme}
      >
        ${this.getContent(this.variant)}
      </div>
    `;
  }
}
