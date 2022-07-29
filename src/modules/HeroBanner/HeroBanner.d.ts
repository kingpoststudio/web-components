import { LitElement } from 'lit';

declare class HeroBanner extends LitElement {
  static styles: import('lit').CSSResult;

  logoImg: {
        src: string;
        alt: string;
    };

  bgImg: {
        src: string;
        alt: string;
    };

  render(): import('lit-html').TemplateResult<1>;
}
export default HeroBanner;
