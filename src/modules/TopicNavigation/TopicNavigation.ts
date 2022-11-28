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

  @property({ type: String })
    title = 'Topics';

  @property({ type: Array })
  private topics: Topic[] = [];

  @property({ type: String })
  private urlParam = 'event_type';

  @property({ type: Boolean })
  private blog = false;

  firstUpdated() {
    this.setActiveTopic();
  }

  setActiveTopic() {
    const url = new URL(window.location.href);

    if (this.blog) {
      const topic = url.pathname.split('/').find((path) => path === 'tag');
      const activeTopic = topic ? url.pathname.split('/')[url.pathname.split('/').indexOf(topic) + 1] : undefined;
      const topicEl = this.shadowRoot?.querySelector(`a[href*="${this.getTopicHref(activeTopic)}"]`);
      if (topicEl) topicEl.classList.add('active');
    } else {
      const param = url.searchParams.get(this.urlParam) || undefined;
      const topicEl = this.shadowRoot?.querySelector(`a[href*="${this.getTopicHref(param)}"]`);
      if (topicEl) topicEl.classList.add('active');
    }
  }

  getTopicHref(topic?: string) {
    const url = new URL(window.location.href);
    const parentPath = url.pathname.split('/')[1];
    if (!topic) return `/${parentPath}`;

    const newUrl = this.blog ? `/${parentPath}/tag/${topic}` : `${url.pathname}?${this.urlParam}=${topic}`;
    return newUrl;
  }

  render() {
    return html`
      <div class="wrap">
        <h3>${this.title}</h3>
        <div class="topics">
          <a class="topic" href="${this.getTopicHref()}">All</a>
          ${this.topics.map((topic) => (html`<a class="topic" href="${this.getTopicHref(topic.id)}">${topic.label}</a>`))}
        </div>
      </div>
    `;
  }
}
