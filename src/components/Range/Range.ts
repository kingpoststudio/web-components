import { html, LitElement } from 'lit';
import { createRef, ref } from "lit/directives/ref.js";

export default class Range extends LitElement {
  id = 'range';

  min = 0;

  minRef = createRef<HTMLInputElement>();

  max = 10;

  maxRef = createRef<HTMLInputElement>();

  step = 1;

  // onChange of min or max, ensure max is either null or >= min.
  handleChange() {
    const minVal = this.minRef.value;
    const maxVal = this.maxRef.value;
  }

  render() {
    return html`
    <div class="wrap">
      <form class="range">
        <div class="min">
          <label for="${this.id}__min">Min</label>
          <input id="${this.id}__min" type="number" min="${this.min}" max="${this.max}" placeholder="${this.min}" required>
        </div>
        <div class="max">
          <label for="${this.id}__max">Max</label>
          <input id="${this.id}__max" type="number" min="${this.min}" max="${this.min}" placeholder="${this.max}" required>
        </div>
        <input type="submit" value="Submit">
      </form>
    </div>
    `;
  }
}
