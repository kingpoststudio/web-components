import { html, unsafeCSS, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import styles from './Range.css';

@customElement('kps-range')
export default class Range extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: String })
    id = 'range';

  /* min/max or plus/minus */
  @property({ type: String })
    type: 'mm' | 'pm' = 'mm';

  @property({ type: Number })
    min = 0;

  @property({ type: Number })
    max = 10;

  @property({ type: Number })
    defaultMin = undefined;

  @property({ type: Number })
    defaultMax = undefined;

  @property({ type: Number })
    step = 1;

  @property({ type: Number })
    tolerance = 0;

  @property({ type: String })
    suffix: string = '';

  minRef = createRef<HTMLInputElement>();

  maxRef = createRef<HTMLInputElement>();

  pmRef = createRef<HTMLInputElement>();

  firstUpdated() {
    this.setDefaults();
  }

  setDefaults() {
    const minVal = this.defaultMin;
    const maxVal = this.defaultMax;

    if (this.type === 'pm' && this.pmRef.value) {
      this.pmRef.value.value = minVal ? (minVal + this.tolerance).toString() : '';
    } else {
      if (minVal && this.minRef.value) this.minRef.value.value = minVal;
      if (maxVal && this.maxRef.value) this.maxRef.value.value = maxVal;
    }
  }

  validateMinMax() {
    const minEl = this.minRef.value;
    const maxEl = this.maxRef.value;

    if (minEl && maxEl) {
      const minVal = Number(minEl.value);
      const maxVal = Number(maxEl.value);
      if (minVal && maxVal && minVal > maxVal) {
        maxEl.value = minVal.toString();
      }
    }
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    const detail = { min: this.min, max: this.max };

    if (this.type === 'pm') {
      detail.min = Number(this.pmRef.value?.value) - this.tolerance;
      detail.max = Number(this.pmRef.value?.value) + this.tolerance;
    } else {
      detail.min = Number(this.minRef.value?.value);
      detail.max = Number(this.maxRef.value?.value);
    }

    this.dispatchEvent(new CustomEvent(`${this.id}RangeSubmit`, {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail,
    }));
  }

  render() {
    return html`
    <div class="wrap">
      <form class="range" @change=${this.validateMinMax} @submit=${this.handleSubmit}>
        <div class="inputs">
        ${this.type === 'pm' ? html`
          <div class="plus-minus">
            <label for="${this.id}__pm">Value ${this.suffix ? html`(${this.suffix})` : ''}</label>
            <input ${ref(this.pmRef)} id="${this.id}__pm" type="number" min="${this.min}" max="${this.max}" step="0.1" placeholder="${this.min}-${this.max}" required>
          </div>
        ` : html`
          <div class="min">
            <label for="${this.id}__min">Min ${this.suffix ? html`(${this.suffix})` : ''}</label>
            <input ${ref(this.minRef)} id="${this.id}__min" type="number" min="${this.min}" max="${this.max}" step="0.1" placeholder="${this.min}" required>
          </div>
          <div class="max">
            <label for="${this.id}__max">Max ${this.suffix ? html`(${this.suffix})` : ''}</label>
            <input ${ref(this.maxRef)} id="${this.id}__max" type="number" min="${this.min}" max="${this.max}" step="0.1" placeholder="${this.max}" required>
          </div>
        `}
        </div>
        <input type="submit" value="Submit">
      </form>
    </div>
    `;
  }
}
