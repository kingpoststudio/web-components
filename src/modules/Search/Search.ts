import { html, unsafeCSS, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref, Ref } from 'lit/directives/ref.js';
import Styles from './Search.css';

let timeout: ReturnType<typeof setTimeout>;

@customElement('kps-search')
export default class Search extends LitElement {
  static styles = [unsafeCSS(Styles)];

  @property({ type: String })
    title = 'Search';

  @property({ type: String })
    urlParam = 'search_term';

  @property({ type: Boolean })
    typeahead = false;

  @property({ type: Object })
    settings = { columnId: '', tableId: '', portalId: '' };

  @state()
    searchTerm: string = '';

  @state()
    matchingTerms: string[] = [];

  @state()
    isLoading: boolean = false;

  inputRef: Ref<HTMLInputElement> = createRef();

  resultsRef: Ref<HTMLDivElement> = createRef();

  constructor() {
    super();

    if (this.typeahead) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.clearMatchingTerms();
      });
    }
  }

  firstUpdated() {
    this.setActiveSearchTerm();
  }

  clearMatchingTerms() {
    this.matchingTerms = [];
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

  async findPartialTermMatches(e: Event): Promise<void> {
    if (!this.typeahead) return;

    const searchTerm = (e.target as HTMLInputElement).value;
    if (searchTerm.length < 3) {
      this.clearMatchingTerms();
      return;
    }

    const fetchResults = async () => {
      const { columnId, tableId, portalId } = this.settings;
      const url = 'https://kingpoststudio.com/api/v1/hubspot/hubdb/search/byTerm';
      const query = `?term=${searchTerm}&columnId=${columnId}&tableId=${tableId}&portalId=${portalId}`;

      this.isLoading = true;

      try {
        const response = await fetch(`${url}${query}`);
        const { matchingTerms } = await response.json();
        this.matchingTerms = matchingTerms as string[];
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
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

  handleBlur(e: Event): void {
    const relTarget = (e as FocusEvent).relatedTarget as HTMLElement;
    if (relTarget === this.resultsRef.value || relTarget === this.inputRef.value) return;

    this.clearMatchingTerms();
  }

  render() {
    return html`
      <div class="wrap">
        <div class="intro">
          <h4>${this.title}</h4>
          ${this.searchTerm ? html`<a class="clear" @click=${this.clearSearchTerm}>Clear</a>` : ''}
        </div>

        <form @input=${this.findPartialTermMatches} @submit=${this.handleFormSubmit} autocomplete="off">
          <div class="search">
            <div class="input">
              <input name="term" placeholder="Search..." @blur=${this.handleBlur} ${ref(this.inputRef)} />
              ${this.isLoading ? html`<kps-icon class="spinner" icon="spinner"></kps-icon>` : ''}
            </div>

            ${this.typeahead ? html`
            <div tabindex="-1" class="typeahead ${this.matchingTerms?.length ? 'visible' : ''}" @blur=${this.handleBlur} ${ref(this.resultsRef)}>
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
