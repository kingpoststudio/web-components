import { html, unsafeCSS, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Styles from './TopicFilter.css';

interface TopicOption {
  id: string;
  name: string;
}

interface Topic {
  name: string;
  id: string;
  options: TopicOption[];
}

@customElement('kps-topic-filter')
export default class TopicFilter extends LitElement {
  static styles = [unsafeCSS(Styles)];

  @property({ type: String })
    title = 'Topic Filters';

  @property({ type: Array })
  private topics: Array<Topic> = [
      {
        name: 'Topic 1',
        id: 'topic-1',
        options: [
          {
            id: '1',
            name: 'Option 1',
          },
          {
            id: '2',
            name: 'Option 2',
          },
          {
            id: '3',
            name: 'Option 3',
          },
        ],
      },
      {
        name: 'Topic 2',
        id: 'topic-2',
        options: [
          {
            id: '1',
            name: 'Option 1',
          },
          {
            id: '2',
            name: 'Option 2',
          },
          {
            id: '3',
            name: 'Option 3',
          },
        ],
      },
    ];

  constructor() {
    super();
  }

  selectTopicOption(e: Event) {
    const topicOption = (e.target as HTMLInputElement)?.value;
    const topicId = topicOption.split('__')[0];
    const optionId = topicOption.split('__')[1];

    if (topicId && optionId) {
      console.log(topicId, optionId);
      this.filterByTopicOption(topicId, optionId);
    }
  }

  filterByTopicOption(topic: string, option: string) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const urlParamValue = params.get(topic);

    if (urlParamValue) {
      params.delete(topic);
    }

    params.set(topic, option);
    window.location.href = `${url.pathname}?${params.toString()}`;
  }

  clearTopicFilters() {
    console.log('clearTopicFilters');
  }

  render() {
    return html`
      <div id="topic-filter">
        <div class="intro">
          <p>${this.title}</p>
          ${true ? html`<a class="clear" @click=${this.clearTopicFilters}>Clear</a>` : ''}
        </div>

        <div class="topics">
          ${this.topics.map((topic) => html`
            <div class="topic">
              <p class="header">${topic.name}</p>
              <div class="options">
                ${topic.options.map((option) => html`
                  <div class="option">
                    <input type="checkbox" id="${topic.id}__${option.id}" name="${option.name}" value="${topic.id}__${option.id}" @click=${this.selectTopicOption}>
                    <label for="${topic.id}__${option.id}">${option.name}</label>
                  </div>
                `)}
              </div>
            </div>
          `)}
        </div>

      </div>
    `;
  }
}
