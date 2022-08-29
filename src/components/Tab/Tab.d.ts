import { LitElement } from 'lit';

export default class Tab extends LitElement {
  static styles: import('lit').CSSResult;

  href: string;

  active: boolean;

  render(): import('lit-html').TemplateResult<1>;
}
