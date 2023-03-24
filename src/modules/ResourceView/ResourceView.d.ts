import { LitElement } from 'lit';
export default class ResourceView extends LitElement {
    static styles: import("lit").CSSResult;
    docUrl: string;
    backUrl: string;
    formId: string | undefined;
    private downloadResource;
    connectedCallback(): void;
    disconnectedCallback(): void;
    get downloadButton(): import("lit").TemplateResult<1>;
    render(): import("lit").TemplateResult<1>;
}
