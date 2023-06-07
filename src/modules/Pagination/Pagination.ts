import { html, unsafeCSS, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Styles from './Pagination.css';

@customElement('kps-pagination')
export default class Pagination extends LitElement {
  static styles = [unsafeCSS(Styles)];

  constructor() {
    super();
    this.generateButton = this.generateButton.bind(this);
  }

  @property({ type: Number })
  private currentPage = 1;

  @property({ type: Number })
  private pageCount = 100;

  @property({ type: String })
  private urlParam = 'page';

  @property({ type: String, attribute: 'active-tag' })
  private activeTag = '';

  @property({ type: Boolean })
  private blog = false;

  goToPage(page: number) {
    if (page === this.currentPage) return;

    const url = new URL(window.location.href);
    let newPath = null;

    if (this.blog) {
      newPath = `/${url.pathname.split('/')[1]}`;
      if (this.activeTag) newPath = `${newPath}/tag/${this.activeTag}`;
      newPath = `${newPath}/page/${page}`;
    } else {
      const params = new URLSearchParams(url.search);
      params.set(this.urlParam, page.toString());
      newPath = `${url.pathname}?${params.toString()}`;
    }

    window.location.href = newPath;
  }

  generateButton(i: number) {
    const loopPage = this.currentPage + i;
    const isCurrentPage = loopPage === this.currentPage;
    const isInRange = loopPage > 0 && loopPage <= this.pageCount;

    return isInRange ? html`
      <a
        class="block ${isCurrentPage ? 'active' : ''}"
        @click=${() => this.goToPage(loopPage)}
        aria-label="Go to page ${this.currentPage + i}"
        role="button"
      >${this.currentPage + i}</a>`
      : null;
  }

  render() {
    return html`
      <div id="pagination">
        <nav aria-label="Pagination" role="navigation">
          <a
            class="block prev-next ${this.currentPage === 1 ? 'disabled' : ''}"
            @click=${() => this.goToPage(1)}
            rel="prev"
            role="button"
            aria-label="Go to first page"
          >
            <svg class="arrow first-page" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 14">
              <polygon points="0 6 6.5 14 13 6 10.87 6 6.5 11.43 2.06 6 0 6"/>
              <polygon points="0 0 6.5 8 13 0 10.87 0 6.5 5.43 2.06 0 0 0"/>
            </svg>
          </a>
          <a
            class="block prev-next ${this.currentPage === 1 ? 'disabled' : ''}"
            @click=${() => this.goToPage(this.currentPage - 1)}
            rel="prev"
            role="button"
            aria-label="Go to previous page"
          >
            <svg class="arrow prev-page" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 8">
              <polygon points="0 0 6.5 8 13 0 10.87 0 6.5 5.43 2.06 0 0 0"/>
            </svg>
          </a>

          ${Array.from({ length: 6 }, (_, i) => i - 2).map(this.generateButton)}

          <a
              class="block prev-next ${this.currentPage === this.pageCount ? 'disabled' : ''}"
              @click=${() => this.goToPage(this.currentPage + 1)}
              rel="next"
              role="button"
              aria-label="Go to next page"
          >
            <svg class="arrow next-page" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 8">
              <polygon class="cls-1" points="0 0 6.5 8 13 0 10.87 0 6.5 5.43 2.06 0 0 0"/>
            </svg>
          </a>
          <a
              class="block prev-next ${this.currentPage === this.pageCount ? 'disabled' : ''}"
              @click=${() => this.goToPage(this.pageCount)}
              aria-label="Go to last page"
              role="button"
              rel="last"
          >
            <svg class="arrow last-page" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 14">
              <polygon points="0 6 6.5 14 13 6 10.87 6 6.5 11.43 2.06 6 0 6"/>
              <polygon points="0 0 6.5 8 13 0 10.87 0 6.5 5.43 2.06 0 0 0"/>
            </svg>
          </a>
        </nav>

        <select class="pagination-select-page" @change="${(event: any) => this.goToPage(event?.target.value)}">
          <option value="" disabled selected>Go to Page</option>
          ${Array.from({ length: this.pageCount }, (_, i) => i + 1).map((page) => html`
            <option value="${page}" ?disabled="${this.currentPage === page}">${page}</option>
          `)}
        </select>
      </div>
    `;
  }
}
