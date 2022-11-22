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

  private dateValue = '';

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

    this.dateValue = params.get(this.urlParam) || '';
  }

  clearDateFilter() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete(this.urlParam);
    params.delete('page');

    window.location.href = `${url.pathname}?${params.toString()}`;
  }

  onFormSelectChange(e: Event) {
    const form = (e.target as HTMLElement).closest('form') as HTMLFormElement;
    const formData = new FormData(form);
    const month = formData.get('month') as string;
    const year = formData.get('year') as string;

    if (month && year) {
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      params.set(this.urlParam, `${month}-${year}`);
      params.delete('page');

      window.location.href = `${url.pathname}?${params.toString()}`;
    }
  }

  render() {
    return html`
      <div class="wrap">
        <div class="intro">
          <p>${this.title}</p>
          ${this.dateValue ? html`<a class="clear" @click=${this.clearDateFilter}>Clear</a>` : ''}
        </div>

        <form class="date-selector" @change=${this.onFormSelectChange}>
          <select name="month">
            <option value="" disabled selected>Month</option>
            ${months.map((month, i) => html`<option value="${i + 1}">${month}</option>`)}
          </select>
          <select name="year">
            <option value="" disabled selected>Year</option>
            ${Array.from(Array(10).keys()).map((year) => html`<option value="${year + 2021}">${year + 2021}</option>`)}
          </select>
        </form>

      </div>
    `;
  }
}
