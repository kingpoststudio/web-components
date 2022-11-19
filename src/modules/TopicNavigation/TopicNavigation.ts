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

  setTopicHref(topic?: string) {
    const url = new URL(window.location.href);
    const blogPath = url.pathname.split('/')[1];
    return topic ? `/${blogPath}/topic/${topic}` : `/${blogPath}`;
  }

  render() {
    return html`
      <div id="topic-navigation">
        <a class="topic" href="${this.setTopicHref()}">All</a>
        ${this.topics.map((topic) => (html`<a class="topic" href="${this.setTopicHref(topic.id)}">${topic.label}</a>`))}
      </div>
    `;
  }
}
