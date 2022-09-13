import { LitElement } from 'lit';

export default class Navigation extends LitElement {
  static styles: import('lit').CSSResult[];

  private isMenuOpen;

  private isSubMenuOpen;

  private isMobileView;

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

  protected render(): import('lit-html').TemplateResult<1>;
}
