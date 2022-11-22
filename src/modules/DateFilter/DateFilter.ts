import { html, unsafeCSS, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Styles from './DateFilter.css';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

@customElement('kps-date-filter')
export default class DateFilter extends LitElement {
  static styles = [unsafeCSS(Styles)];

  @property({ type: Boolean })
  isFilteringActive = false;

  @property({ type: String })
  title = 'Filter by Date';

  @property({ type: String })
  urlParam = 'selected_date';

  firstUpdated() {
    this.setActiveDateValue();
  }

  setActiveDateValue() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
  }

  clearDateFilter() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete('page');

    window.location.href = `${url.pathname}?${params.toString()}`;
  }

  render() {
    return html`
      <div class="wrap">
        <div class="intro">
          <p>${this.title}</p>
          ${this.isFilteringActive ? html`<a class="clear" @click=${this.clearDateFilter}>Clear</a>` : ''}
        </div>

        <div class="date-selector">
          <select>
            <option value="" disabled selected>Month</option>
            ${months.map((month, i) => html`<option value="${i + 1}">${month}</option>`)}
          </select>
          <select>
            <option value="" disabled selected>Year</option>
            ${Array.from(Array(10).keys()).map((year) => html`<option value="${year + 2021}">${year + 2021}</option>`)}
        </div>

      </div>
    `;
  }
}
