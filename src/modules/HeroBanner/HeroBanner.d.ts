import { LitElement } from 'lit';
declare class HeroBanner extends LitElement {
    static styles: import("lit").CSSResult;
    logoImg: {
        src: string;
        alt: string;
    };
    bgImg: {
        src: string;
        alt: string;
    };
    mobileImg: {
        src: string;
        alt: string;
    };
    hideCta: boolean;
    hideExtra: boolean;
    condensed: boolean;
    contained: boolean;
    render(): import("lit").TemplateResult<1>;
}
export default HeroBanner;
