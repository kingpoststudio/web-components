import { LitElement } from 'lit';
export default class Fade extends LitElement {
    clientHeight: number;
    scrollHeight: number;
    scrollTop: number;
    private container;
    private fade;
    static styles: import("lit").CSSResult;
    constructor();
    firstUpdated(): void;
    disconnectedCallback(): void;
    updateFade(): void;
    render(): import("lit").TemplateResult<1>;
}
