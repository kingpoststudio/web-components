import { LitElement } from 'lit';
export default class Pagination extends LitElement {
    static styles: import("lit").CSSResult[];
    constructor();
    private currentPage;
    private pageCount;
    private urlParam;
    private blog;
    goToPage(page: number): void;
    generateButton(i: number): import("lit").TemplateResult<1> | null;
    render(): import("lit").TemplateResult<1>;
}
