import { html, unsafeCSS, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import styles from './Range.css';

@customElement('kps-range')
export default class Range extends LitElement {
  static styles = [unsafeCSS(styles)];

  id = 'range';

  min = 0;

  max = 10;

  minRef = createRef<HTMLInputElement>();

  maxRef = createRef<HTMLInputElement>();

  step = 1;

  disabled = false;

  handleSubmit(e: Event) {
    e.preventDefault();
    const detail = {
      id: this.id,
      min: this.minRef.value?.value,
      max: this.maxRef.value?.value,
    };

    this.dispatchEvent(new CustomEvent('range-submit', { detail }));
  }

  render() {
    return html`
    <div class="wrap">
      <form class="range" @submit="${this.handleSubmit}">
      <div style="display:flex;gap:0.5rem;">
        <div class="min">
          <label for="${this.id}__min">Min</label>
          <input ${ref(this.minRef)} id="${this.id}__min" type="number" min="${this.min}" max="${this.max}" placeholder="${this.min}" required>
        </div>
        <div class="max">
          <label for="${this.id}__max">Max</label>
          <input ${ref(this.maxRef)} id="${this.id}__max" type="number" min="${this.min}" max="${this.max}" placeholder="${this.max}" required>
        </div>
      </div>
      <input type="submit" value="Submit">
      </form>
    </div>
    `;
  }
}
