import { LitElement } from 'lit';
export default class TabGroup extends LitElement {
    static styles: import("lit").CSSResult;
    isOpen: boolean;
    activeTab: Element | null;
    firstUpdated(): void;
    private toggleOpen;
    render(): import("lit-html").TemplateResult<1>;
}
