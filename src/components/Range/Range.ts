import { html, unsafeCSS, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import styles from './Range.css';

@customElement('kps-range')
export default class Range extends LitElement {
  static styles = [unsafeCSS(styles)];

  @property({ type: String })
    id = 'range';

  @property({ type: Number })
    min = 0;

  @property({ type: Number })
    max = 10;

  @property({ type: Number })
    step = 1;

  @property({ type: Number })
    defaultMin = undefined;

  @property({ type: Number })
    defaultMax = undefined;

  @property({ type: String })
    suffix: string = '';

  minRef = createRef<HTMLInputElement>();

  maxRef = createRef<HTMLInputElement>();

  disabled = false;

  firstUpdated() {
    const minVal = this.defaultMin;
    const maxVal = this.defaultMax;
    if (minVal && this.minRef.value) this.minRef.value.value = minVal;
    if (maxVal && this.maxRef.value) this.maxRef.value.value = maxVal;
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    const detail = {
      id: this.id,
      min: this.minRef.value?.value,
      max: this.maxRef.value?.value,
    };

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
      <form class="range" @submit="${this.handleSubmit}">
      <div style="display:flex;gap:0.5rem;">
        <div class="min">
          <label for="${this.id}__min">Min ${this.suffix ? html`(${this.suffix})` : ''}</label>
          <input ${ref(this.minRef)} id="${this.id}__min" type="number" min="${this.min}" max="${this.max}" step="0.1" placeholder="${this.min}" required>
        </div>
        <div class="max">
          <label for="${this.id}__max">Max ${this.suffix ? html`(${this.suffix})` : ''}</label>
          <input ${ref(this.maxRef)} id="${this.id}__max" type="number" min="${this.min}" max="${this.max}" step="0.1" placeholder="${this.max}" required>
        </div>
      </div>
      <input type="submit" value="Submit">
      </form>
    </div>
    `;
  }
}
