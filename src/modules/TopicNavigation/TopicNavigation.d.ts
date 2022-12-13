import { LitElement } from 'lit';
export default class TopicFilter extends LitElement {
    static styles: import("lit").CSSResult[];
    title: string;
    private topics;
    private urlParam;
    private blog;
    firstUpdated(): void;
    setActiveTopic(): void;
    getTopicHref(topic?: string): string;
    render(): import("lit").TemplateResult<1>;
}
