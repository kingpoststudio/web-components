import { LitElement } from 'lit';

declare type CardVariant = 'base' | 'article' | 'quote' | 'post';
export default class Card extends LitElement {
  static styles: import('lit').CSSResult;

  private zoomed;

  variant: CardVariant;

  color: 'primary' | 'secondary';

  theme: 'light' | 'dark';

  rounded: boolean;

  title: string;

  description: string;

  link: {
        label: string;
        href: string;
        target: string;
    };

  toggleZoom(): void;

  get baseContent(): import('lit-html').TemplateResult<1>;

  get quoteContent(): import('lit-html').TemplateResult<1>;

  get postContent(): import('lit-html').TemplateResult<1>;

  getContent(variant: CardVariant): import('lit-html').TemplateResult<1>;

  render(): import('lit-html').TemplateResult<1>;
}
export {};
