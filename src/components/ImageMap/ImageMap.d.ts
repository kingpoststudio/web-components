import { LitElement } from 'lit';

export default class ImageMap extends LitElement {
  static styles: import('lit').CSSResult;

  imageMapRef: import('lit-html/directives/ref').Ref<HTMLDivElement>;

  private image;

  private points;

  private emphasized;

  constructor();

  connectedCallback(): void;

  disconnectedCallback(): void;

  firstUpdated(): void;

  toggleEmphasized(): void;

  repositionTags(): void;

  render(): import('lit-html').TemplateResult<1>;
}
