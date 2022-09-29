import { LitElement } from 'lit';

export default class Scroller extends LitElement {
  static styles: import('lit').CSSResult;

  wrapRef: import('lit-html/directives/ref').Ref<HTMLDivElement>;

  render(): import('lit-html').TemplateResult<1>;
}
