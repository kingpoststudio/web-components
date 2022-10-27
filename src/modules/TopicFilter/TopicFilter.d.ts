import { LitElement } from 'lit';
export default class TopicFilter extends LitElement {
    static styles: import("lit").CSSResult[];
    title: string;
    private topics;
    firstUpdated(): void;
    setActiveTopicOptions(): void;
    selectTopicOption(e: Event): void;
    filterByTopicOption(topic: string, option: string): void;
    clearTopicFilters(): void;
    render(): import("lit-html").TemplateResult<1>;
}
