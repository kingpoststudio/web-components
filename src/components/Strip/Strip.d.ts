import { LitElement } from 'lit';

export default class Strip extends LitElement {
  static styles: import('lit').CSSResult;

  position: 'left' | 'right';

  color: 'primary' | 'secondary';

  theme: 'light' | 'dark';

  render(): import('lit-html').TemplateResult<1>;
}
