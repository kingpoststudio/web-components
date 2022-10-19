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
  private topics: Array<Topic> = [];

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
          
        </div>
      </div>
    `;
  }
}
