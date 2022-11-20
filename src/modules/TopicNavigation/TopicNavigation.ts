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

  firstUpdated() {
    this.setActiveTopic();
  }

  setActiveTopic() {
    const url = new URL(window.location.href);
    const topic = url.pathname.split('/').find((path) => path === 'tag');
    const activeTopic = topic ? url.pathname.split('/')[url.pathname.split('/').indexOf(topic) + 1] : undefined;
    const topicEl = this.shadowRoot?.querySelector(`a[href*="${this.getTopicHref(activeTopic)}"]`);
    if (topicEl) topicEl.classList.add('active');
  }

  getTopicHref(topic?: string) {
    const url = new URL(window.location.href);
    const blogPath = url.pathname.split('/')[1];
    return topic ? `/${blogPath}/tag/${topic}` : `/${blogPath}`;
  }

  render() {
    return html`
      <div class="wrap">
        <a class="topic" href="${this.getTopicHref()}">All</a>
        ${this.topics.map((topic) => (html`<a class="topic" href="${this.getTopicHref(topic.id)}">${topic.label}</a>`))}
      </div>
    `;
  }
}
