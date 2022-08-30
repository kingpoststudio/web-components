import { LitElement } from 'lit';

export default class TabGroup extends LitElement {
  static styles: import('lit').CSSResult;

  isOpen: boolean;

  triggerLabel: string;

  private toggleOpen;

  private onResize;

  connectedCallback(): void;

  disconnectedCallback(): void;

  render(): import('lit-html').TemplateResult<1>;
}
