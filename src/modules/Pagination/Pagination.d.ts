import { LitElement } from 'lit';
export default class Pagination extends LitElement {
    static styles: import("lit").CSSResult[];
    constructor();
    private currentPage;
    private pageCount;
    private urlParam;
    goToPage(page: number): void;
    generateButton(i: number): import("lit-html").TemplateResult<1> | null;
    render(): import("lit-html").TemplateResult<1>;
}
