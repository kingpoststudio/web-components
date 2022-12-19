import { LitElement } from 'lit';
interface TopicOption {
    id: string;
    name: string;
}
interface Topic {
    name: string;
    id: string;
    type: 'checkbox' | 'select' | 'multiselect' | 'range-mm' | 'range-pm';
    options: TopicOption[];
    range?: {
        min: number;
        max: number;
        defaultmin?: number;
        defaultmax?: number;
        tolerance?: number;
        suffix?: string;
    };
}
export default class TopicFilter extends LitElement {
    static styles: import("lit").CSSResult[];
    title: string;
    topics: Array<Topic>;
    blog: boolean;
    firstUpdated(): void;
    setActiveTopicOptions(): void;
    selectTopicOption(e: Event): void;
    filterByTopicOption(topicId: string, optionId: string): void;
    clearTopicFilter(topicId?: string): void;
    renderSelect(topic: Topic): import("lit").TemplateResult<1>;
    renderMultiSelect(topic: Topic): import("lit").TemplateResult<1>;
    renderCheckboxes(topic: Topic): import("lit").TemplateResult<1>;
    renderRange(topic: Topic): import("lit").TemplateResult<1>;
    get renderedTopics(): import("lit").TemplateResult<1>;
    render(): import("lit").TemplateResult<1>;
}
export {};
