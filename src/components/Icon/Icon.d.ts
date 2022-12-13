import { LitElement } from 'lit';
export default class Icon extends LitElement {
    static styles: import("lit").CSSResult;
    icon: string;
    get iconSvg(): import("lit").TemplateResult<1>;
    render(): import("lit").TemplateResult<1>;
}
