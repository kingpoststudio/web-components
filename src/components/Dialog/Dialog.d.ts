import { LitElement } from 'lit';

export default class Dialog extends LitElement {
  static styles: import('lit').CSSResult;

  isOpen: boolean;

  open(): void;

  close(): void;

  onKeyup(e: KeyboardEvent): void;

  onBackdropClick(e: MouseEvent): null;

  render(): import('lit-html').TemplateResult<1>;
}
