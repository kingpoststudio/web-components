import { LitElement } from 'lit';
export default class BackToTop extends LitElement {
    icon: string;
    shadow: boolean;
    static styles: import("lit").CSSResult;
    static scrollToTop(): void;
    render(): import("lit-html").TemplateResult<1>;
}
