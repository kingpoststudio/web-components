import { LitElement } from 'lit';
import Tab from '../Tab/Tab';
interface Link {
    label: string;
    href: string;
    isActive: boolean;
    isEmphasized: boolean;
}
export default class TabGroup extends LitElement {
    static styles: import("lit").CSSResult;
    title: string;
    links: Link[];
    emphasizedLink: Link | undefined;
    constructor();
    get slottedTabs(): Tab[];
    get tabLinks(): import("lit").TemplateResult<1>[];
    static setTabStatus(tab: Tab, isActive: Boolean): void;
    updateLinks(): void;
    updateTabs(): void;
    onSlotChange(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
export {};
