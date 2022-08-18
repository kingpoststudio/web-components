import { LitElement } from 'lit';

declare global {
    interface Window {
        hbspt: any;
    }
}
export default class Form extends LitElement {
  isHsForm: boolean;

  formId: string;

  portalId: string;

  static styles: import('lit').CSSResult;

  firstUpdated(): void;

  render(): import('lit-html').TemplateResult<1>;
}
