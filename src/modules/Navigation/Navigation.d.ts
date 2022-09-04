import { LitElement } from 'lit';
import './Navigation.css';

export default class Navigation extends LitElement {
  static styles: import('lit').CSSResult;

  isOpen: boolean;

  logoImg: {
        src: string;
        alt: string;
    };

  private toggleMenu;

  protected render(): import('lit-html').TemplateResult<1>;
}
