import { LitElement } from 'lit';
export default class Dialog extends LitElement {
    dialogRef: import("lit-html/directives/ref").Ref<HTMLDialogElement>;
    overlayRef: import("lit-html/directives/ref").Ref<HTMLDivElement>;
    private variant;
    private theme;
    private button;
    private isOpen;
    static styles: import("lit").CSSResult;
    open: (e: Event) => void;
    close: (e: Event) => void;
    handleClick: (e: Event) => void;
    get trigger(): import("lit").TemplateResult<1>;
    get content(): import("lit").TemplateResult<1>;
    render(): import("lit").TemplateResult<1>;
}
