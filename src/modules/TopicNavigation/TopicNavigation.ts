import { html, unsafeCSS, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Styles from './TopicNavigation.css';

interface Topic {
  id: string;
  label: string;
}

@customElement('kps-topic-navigation')
export default class TopicFilter extends LitElement {
  static styles = [unsafeCSS(Styles)];

  @property({ type: Array })
  private topics: Topic[] = [];

  render() {
    return html`
      <div id="topic-navigation">
        ${this.topics.map((topic) => (html`<a class="topic" href="#${topic.id}">${topic.label}</a>`))}
      </div>
    `;
  }
}
