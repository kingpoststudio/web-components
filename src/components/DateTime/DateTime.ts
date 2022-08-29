// Create a time Lit component that acts like a <time> element.
import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

// @ts-ignore
@customElement('kps-datetime')
export default class DateTime extends LitElement {
  @property({ type: String })
    datetime = '';

  @property({ type: String })
    variant = 'days-ago';

  @state()
  private dateString = html``;

  formatDaysAgo() {
    if (this.datetime) {
      const date = new Date(this.datetime);
      const diff = Math.floor((new Date().getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
      this.dateString = html`<span>${diff} ${diff === 1 ? 'day' : 'days'} ago</span>`;
    }
  }

  firstUpdated() {
    this.formatDaysAgo();
  }

  render() {
    return html`
      <time datetime="${this.datetime}">${this.dateString}</time>
    `;
  }
}
