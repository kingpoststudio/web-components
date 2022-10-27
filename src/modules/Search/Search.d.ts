import { LitElement } from 'lit';
export default class Search extends LitElement {
    static styles: import("lit").CSSResult[];
    constructor();
    private searchTerm;
    title: string;
    urlParam: string;
    setSearchTermValue(): void;
    searchByTerm(e: HTMLFormElement): void;
    clearSearchTerm(): void;
    render(): import("lit-html").TemplateResult<1>;
}
