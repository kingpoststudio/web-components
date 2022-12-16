import { html, LitElement } from 'lit';

export default class Range extends LitElement {
  min = 0;

  max = 0;

  value = 0;

  step = 1;

  range = {
    id: 'range',
    min: 0,
    max: 100,
    value: 0,
    step: 1,
  };

  render() {
    return html`
    <div class="wrap">
      <form class="range">
        <div class="min">
          <label for="${this.range.id}__min">Min</label>
          <input id="${this.range.id}__min" type="number" min="${this.range.min}" max="${this.range.max}" placeholder="${this.range.min}">
        </div>
        <div class="max">
          <label for="${this.range.id}__max">Max</label>
          <input id="${this.range.id}__max" type="number" min="${this.range.min}" max="${this.range.min}" placeholder="${this.range.max}">
        </div>
      </form>
      <kps-button>Submit</kps-button>
    </div>
    `;
  }
}
