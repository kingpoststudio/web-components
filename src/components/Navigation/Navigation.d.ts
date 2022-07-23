import { LitElement } from 'lit';
import Button from '../Button/Button';

export declare class Navigation extends LitElement {
  static styles: import('lit').CSSResult;

  button: Button | undefined;

  svgBurger: import('lit-html').TemplateResult<1>;

  svgClose: import('lit-html').TemplateResult<1>;

  static render(): import('lit-html').TemplateResult<1>;
}
export default Navigation;
