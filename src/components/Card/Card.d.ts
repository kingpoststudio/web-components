import { LitElement } from 'lit';

export default class Card extends LitElement {
  variant: 'default' | 'quote';

  theme: 'primary' | 'secondary';

  round: boolean;

  title: string;

  description: string;

  link: {
        label: string;
        href: string;
        target: string;
    };

  img: {
        src: string;
        alt: string;
    };

  static styles: import('lit').CSSResult;

  render(): import('lit-html').TemplateResult<1>;
}
