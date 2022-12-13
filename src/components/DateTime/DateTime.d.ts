import { LitElement } from 'lit';
export default class DateTime extends LitElement {
    datetime: string;
    variant: string;
    private dateString;
    formatDaysAgo(): void;
    firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
}
