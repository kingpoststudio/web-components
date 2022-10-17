import { html, unsafeCSS, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Styles from './Search.css';

@customElement('kps-search')
export default class Search extends LitElement {
  static styles = [unsafeCSS(Styles)];

  constructor() {
    super();
  }

  @property({ type: String })
    title = 'Search';

  @property({ type: String })
    urlParam = 'search-term';

  // setSearchTermValue() {
  //   const url = new URL(window.location.href);
  //   const params = new URLSearchParams(url.search);
  //   const urlParamValue = params.get(this.urlParam);

  //   if (urlParamValue) {
  //     this.searchTerm = urlParamValue;
  //   }
  // }

  searchByTerm(e: HTMLFormElement): void {
    e.preventDefault();

    const { value: searchTerm } = e.target['search-term'];
    const url = new URL(window.location.href);
    const params = new URLSearchParams();

    params.set(this.urlParam, searchTerm);
    window.location.href = `${url.pathname}?${params.toString()}`;
  }

  render() {
    return html`
      <div id="search">
        <div class="intro">
          <p>${this.title}</p>
          <a class="clear" @click=${() => { }}>Clear!!!</a>
        </div>

        <form class="" @submit=${this.searchByTerm}>
          <input name="search-term" placeholder="Search..." />
          <button type="submit">Search</button>
        </form>
      </div>
    `;
  }
}
