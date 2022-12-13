import { LitElement } from 'lit';
export default class Select extends LitElement {
    static styles: import("lit").CSSResult;
    private isOpen;
    private variant;
    private placeholder;
    private toggleOpen;
    private onResize;
    connectedCallback(): void;
    disconnectedCallback(): void;
    onOptionClick(e: Event): void;
    render(): import("lit").TemplateResult<1>;
}
