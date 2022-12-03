import { html, unsafeCSS, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import Styles from './Search.css';

let timeout: ReturnType<typeof setTimeout>;

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
    settings = { columnId: '', tableId: '', portalId: '' };

  @state()
    matchingTerms: string[] = [];

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

  async findPartialtermMatches(e: Event): Promise<void> {
    if (!this.typeahead) return;

    const searchTerm = (e.target as HTMLInputElement).value;
    if (searchTerm.length < 3) {
      this.matchingTerms = [];
      return;
    }

    const fetchResults = async () => {
      const { columnId, tableId, portalId } = this.settings;
      const url = 'https://kingpoststudio.com/api/hubdb/search/byTerm';
      const query = `?term=${searchTerm}&columnId=${columnId}&tableId=${tableId}&portalId=${portalId}`;
      const response = await fetch(`${url}${query}`);
      const { matchingTerms } = await response.json();
      this.matchingTerms = matchingTerms as string[];
    };

    clearTimeout(timeout);
    timeout = setTimeout(fetchResults, 250);
  }

  searchByTerm(searchTerm: string): void {
    const url = new URL(window.location.href);
    const params = new URLSearchParams();

    params.set(this.urlParam, searchTerm);
    window.location.href = `${url.pathname}?${params.toString()}`;
  }

  clearSearchTerm(): void {
    this.searchTerm = '';
    const url = new URL(window.location.href);
    window.location.href = url.pathname;
  }

  handleFormSubmit(e: Event): void {
    e.preventDefault();

    const inputVal = ((e.target as HTMLFormElement)?.querySelector('input[name="term"]') as HTMLInputElement)?.value;
    if (!inputVal) this.clearSearchTerm();
    this.searchByTerm(inputVal);
  }

  render() {
    return html`
      <div class="wrap">
        <div class="intro">
          <p>${this.title}</p>
          ${this.searchTerm ? html`<a class="clear" @click=${this.clearSearchTerm}>Clear</a>` : ''}
        </div>

        <form @input=${this.findPartialtermMatches} @submit=${this.searchByTerm}>
          <div class="search">
            <input name="term" placeholder="Search..." />
            ${this.typeahead ? html`
            <kps-icon class="spinner" icon="spinner"></kps-icon>
            <div class="typeahead ${this.matchingTerms?.length ? 'visible' : ''}">
              <span>Possible results</span>
              <ul>
                ${this.matchingTerms.map((match) => html`<li @click=${() => this.searchByTerm(match)}>${match}</li>`)}
              </ul>
            </div>
            ` : ''}
          </div>
          <kps-button type="submit">Search</kps-button>
        </form>
      </div>
    `;
  }
}
