import { html, unsafeCSS, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Styles from './Pagination.css';

@customElement('kps-pagination')
export default class Pagination extends LitElement {
  static styles = [unsafeCSS(Styles)];

  render() {
    return html`
      <div id="pagination">
        <nav aria-label="Pagination" role="navigation">
          <a
            class="block"
            @click=${() => { }}
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
            class="block"
            @click=${() => { }}
            rel="prev"
            role="button"
            aria-label="Go to previous page"
          >
            <svg class="arrow prev-page" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 8">
              <polygon points="0 0 6.5 8 13 0 10.87 0 6.5 5.43 2.06 0 0 0"/>
            </svg>
          </a>
          ${Array.from({ length: 6 }, (_, i) => i - 2).map((i) => html`
            <a
              class="block"
              @click=${() => { }}
              aria-label="Go to page ${i}"
              aria-current=${i === 0 ? 'page' : 'false'}
              role="button"
            >
              ${i}
            </a>
          `)}
          <a
              class="block"
              @click=${() => { }}
              rel="next"
              role="button"
              aria-label="Go to next page"
          >
            <svg class="arrow next-page" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 8">
              <polygon class="cls-1" points="0 0 6.5 8 13 0 10.87 0 6.5 5.43 2.06 0 0 0"/>
            </svg>
          </a>
          <a
              class="block"
              @click=${() => { }}
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

        <select class="pagination-select-page" onchange="controllers.hubDbPaginationCtrl.goToPage(event.target.value)">
          <option value="" disabled selected>Go to Page</option>
        </select>
      </div>
    `;
  }
}
