import { LitElement } from 'lit';
export default class Icon extends LitElement {
    static styles: import("lit").CSSResult;
    icon: string;
    get iconSvg(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
}
