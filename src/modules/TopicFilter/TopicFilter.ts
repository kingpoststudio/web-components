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
            id: 'topic-1-option-1',
            name: 'Topic 1 Option 1',
          },
          {
            id: 'topic-1-option-2',
            name: 'Topic 1 Option 2',
          },
          {
            id: 'topic-1-option-3',
            name: 'Topic 1 Option 3',
          },
        ],
      },
      {
        name: 'Topic 2',
        id: 'topic-2',
        options: [
          {
            id: 'topic-2-option-1',
            name: 'Topic 2 Option 1',
          },
          {
            id: 'topic-2-option-2',
            name: 'Topic 2 Option 2',
          },
          {
            id: 'topic-2-option-3',
            name: 'Topic 2 Option 3',
          },
        ],
      },
    ];

  constructor() {
    super();
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
              <div class="header">
                <h4>${topic.name}</h4>
              </div>
              <div class="options">
                ${topic.options.map((option) => html`
                  <div class="option">
                    <input type="checkbox" id="${option.id}" name="${option.name}" value="${option.id}">
                    <label for="${option.id}">${option.name}</label>
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
