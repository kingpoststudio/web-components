import { LitElement } from 'lit';
import './Navigation.css';

export default class Navigation extends LitElement {
  static styles: import('lit').CSSResult;

  private isOpen;

  private isSubOpen;

  private isMobile;

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
