import { html, unsafeCSS, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Styles from './Search.css';

@customElement('kps-search')
export default class Search extends LitElement {
  static styles = [unsafeCSS(Styles)];

  constructor() {
    super();
    this.setSearchTermValue();
  }

  private searchTerm = '';

  @property({ type: String })
  title = 'Search';

  @property({ type: String })
  urlParam = 'search_term';

  @property({ type: Boolean })
  typeahead = false;

  @property({ type: Object })
  settings = { portalId: 22628452 };

  firstUpdated() {
    this.setActiveSearchTerm();
  }

  setActiveSearchTerm() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const searchTerm = params.get(this.urlParam);

    if (searchTerm) {
      this.searchTerm = searchTerm;
      this.shadowRoot?.querySelector('input')?.setAttribute('value', searchTerm);
    }
  }

  setSearchTermValue() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const urlParamValue = params.get(this.urlParam);

    if (urlParamValue) {
      this.searchTerm = urlParamValue;
    }
  }

  searchByTerm(e: HTMLFormElement): void {
    e.preventDefault();

    // @ts-ignore
    const searchTerm = e.target['search-term'].value;
    const url = new URL(window.location.href);
    const params = new URLSearchParams();

    params.set(this.urlParam, searchTerm);
    window.location.href = `${url.pathname}?${params.toString()}`;
  }

  findPartialMatches(e: HTMLElement): void {
    // @ts-ignore
    const searchTerm = (e.target as HTMLInputElement).value;

    fetch(`http://localhost:3000/api/hubdb/search/byTerm?term=${searchTerm}&columnId=search_terms&tableId=chromatogram_documents&hsAccountId=22628452`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  clearSearchTerm(): void {
    this.searchTerm = '';
    const url = new URL(window.location.href);
    window.location.href = url.pathname;
  }

  render() {
    return html`
      <div id="search">
        <div class="intro">
          <p>${this.title}</p>
          ${this.searchTerm ? html`<a class="clear" @click=${this.clearSearchTerm}>Clear</a>` : ''}
        </div>

        <form @input=${this.findPartialMatches} @submit=${this.searchByTerm}>
          <input name="search-term" placeholder="Search..." />
          <kps-button type="submit">Search</kps-button>
        </form>
      </div>
    `;
  }
}
