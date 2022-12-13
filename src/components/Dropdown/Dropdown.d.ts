import { LitElement } from 'lit';
export default class Dropdown extends LitElement {
    static styles: import("lit").CSSResult;
    private isOpen;
    open: (e: Event) => void;
    close: (e: Event) => void;
    render(): import("lit").TemplateResult<1>;
}
