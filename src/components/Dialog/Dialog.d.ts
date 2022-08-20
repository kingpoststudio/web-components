import { LitElement } from 'lit';

export default class Dialog extends LitElement {
  dialogRef: import('lit-html/directives/ref').Ref<HTMLDialogElement>;

  overlayRef: import('lit-html/directives/ref').Ref<HTMLDivElement>;

  private variant;

  private theme;

  private isOpen;

  static styles: import('lit').CSSResult;

  open: (e: Event) => void;

  close: (e: Event) => void;

  get trigger(): import('lit-html').TemplateResult<1>;

  get content(): import('lit-html').TemplateResult<1>;

  render(): import('lit-html').TemplateResult<1>;
}
