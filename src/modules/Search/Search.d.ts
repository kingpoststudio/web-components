import { LitElement } from 'lit';
import { Ref } from 'lit/directives/ref.js';
export default class Search extends LitElement {
    static styles: import("lit").CSSResult[];
    constructor();
    private searchTerm;
    title: string;
    urlParam: string;
    typeahead: boolean;
    settings: {
        columnId: string;
        tableId: string;
        portalId: string;
    };
    matchingTerms: string[];
    isLoading: boolean;
    inputRef: Ref<HTMLInputElement>;
    resultsRef: Ref<HTMLDivElement>;
    firstUpdated(): void;
    clearMatchingTerms(): void;
    setActiveSearchTerm(): void;
    setSearchTermValue(): void;
    findPartialtermMatches(e: Event): Promise<void>;
    searchByTerm(searchTerm: string): void;
    clearSearchTerm(): void;
    handleFormSubmit(e: Event): void;
    handleBlur(e: Event): void;
    render(): import("lit").TemplateResult<1>;
}
