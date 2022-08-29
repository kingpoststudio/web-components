import { LitElement } from 'lit';

export default class TabGroup extends LitElement {
  static styles: import('lit').CSSResult;

  activeTab: string;

  render(): import('lit-html').TemplateResult<1>;
}
