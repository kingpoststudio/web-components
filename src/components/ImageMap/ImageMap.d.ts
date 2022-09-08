import { LitElement } from 'lit';

export default class ImageMap extends LitElement {
  static styles: import('lit').CSSResult;

  private image;

  private points;

  firstUpdated(): void;

  render(): import('lit-html').TemplateResult<1>;
}
