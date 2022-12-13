import { LitElement } from 'lit';
export default class DateFilter extends LitElement {
    static styles: import("lit").CSSResult[];
    dateValue: string;
    title: string;
    urlParam: string;
    firstUpdated(): void;
    setActiveDateValue(): void;
    clearDateFilter(): void;
    onFormSelectChange(e: Event): void;
    render(): import("lit").TemplateResult<1>;
}
