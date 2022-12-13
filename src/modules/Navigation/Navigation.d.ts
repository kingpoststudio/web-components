import { LitElement } from 'lit';
export default class Navigation extends LitElement {
    static styles: import("lit").CSSResult[];
    private isMenuOpen;
    private isSubMenuOpen;
    private isMobileView;
    private theme;
    private logoImg;
    constructor();
    private toggleMenu;
    private toggleSubMenu;
    private toggleSubOpen;
    private handleResize;
    private menuLinkClickHandler;
    private manageMenuLinks;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected render(): import("lit").TemplateResult<1>;
}
