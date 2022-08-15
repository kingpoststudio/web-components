import { LitElement } from 'lit';
export default class Container extends LitElement {
    static styles: import("lit").CSSResult;
    paddingX: string;
    paddingY: string;
    fullWidth: boolean;
    protected render(): import("lit-html").TemplateResult<1>;
}
