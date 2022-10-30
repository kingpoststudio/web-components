import { LitElement } from 'lit';
interface TopicOption {
    id: string;
    name: string;
}
interface Topic {
    name: string;
    id: string;
    options: TopicOption[];
}
export default class TopicFilter extends LitElement {
    static styles: import("lit").CSSResult[];
    isFilteringActive: boolean;
    title: string;
    topics: Array<Topic>;
    firstUpdated(): void;
    setActiveTopicOptions(): void;
    selectTopicOption(e: Event): void;
    filterByTopicOption(topic: string, option: string): void;
    clearTopicFilters(): void;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
