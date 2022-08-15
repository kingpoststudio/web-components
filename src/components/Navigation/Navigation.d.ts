import { LitElement } from 'lit';
import './Navigation.css';

export default class Navigation extends LitElement {
  static styles: import('lit').CSSResult;

  logoImg: {
        src: string;
        alt: string;
    };

  protected render(): import('lit-html').TemplateResult<1>;
}
