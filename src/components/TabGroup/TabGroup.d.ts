import { LitElement } from 'lit';
import Tab from '../Tab/Tab';

interface Link {
    label: string;
    href: string;
    isActive: boolean;
}
export default class TabGroup extends LitElement {
  static styles: import('lit').CSSResult;

  title: string;

  links: Link[];

  constructor();

  get slottedTabs(): Tab[];

  get tabLinks(): import('lit-html').TemplateResult<1>[];

  static setTabStatus(tab: Tab, isActive: Boolean): void;

  updateLinks(): void;

  updateTabs(): void;

  onSlotChange(): void;

  connectedCallback(): void;

  disconnectedCallback(): void;

  render(): import('lit-html').TemplateResult<1>;
}
export {};
