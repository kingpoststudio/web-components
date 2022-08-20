import { LitElement } from 'lit';

declare global {
    interface Window {
        hbspt: any;
    }
}
export default class Form extends LitElement {
  hubspot: boolean;

  formId: string;

  portalId: string;

  target: string;

  static styles: import('lit').CSSResult;

  private initHsFormScript;

  firstUpdated(): void;

  render(): import('lit-html').TemplateResult<1>;
}
