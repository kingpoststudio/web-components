import { LitElement } from 'lit';

export default class DateTime extends LitElement {
  datetime: string;

  variant: string;

  private dateString;

  formatDaysAgo(): void;

  firstUpdated(): void;

  render(): import('lit-html').TemplateResult<1>;
}
