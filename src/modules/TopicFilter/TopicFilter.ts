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
  type: 'checkbox' | 'select' | 'multiselect';
  options: TopicOption[];
}

@customElement('kps-topic-filter')
export default class TopicFilter extends LitElement {
  static styles = [unsafeCSS(Styles)];

  @property({ type: Boolean })
  isFilteringActive = false;

  @property({ type: String })
  title = 'Topic Filters';

  @property({ type: Array })
  topics: Array<Topic> = [];

  firstUpdated() {
    this.setActiveTopicOptions();
  }

  setActiveTopicOptions() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    params.forEach((value, key) => {
      const valueArr = value.split(',');
      valueArr.forEach((val) => {
        const parentEl = this.shadowRoot?.querySelector(`[data-topic-id="${key}"]`);
        const type = parentEl?.getAttribute('data-type');
        const childEl = parentEl?.querySelector(`[value="${key}__${val}"]`);

        if (type === 'checkbox') (childEl as HTMLInputElement).checked = true;
        else if (type === 'select') (childEl as HTMLOptionElement).selected = true;
      });
    });
  }

  selectTopicOption(e: Event) {
    const topicOption = (e.target as HTMLInputElement)?.value;
    const topicId = topicOption.split('__')[0];
    const optionId = topicOption.split('__')[1];

    if (topicId && optionId) {
      this.filterByTopicOption(topicId, optionId);
    }
  }

  filterByTopicOption(topicId: string, optionId: string) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const topic = this.topics.find((t) => t.id === topicId);
    const topicValues = params.get(topicId);
    if (!topic) return;

    if (topic.type === 'checkbox' && topicValues) {
      const activeOptions = topicValues.split(',');
      const index = activeOptions.indexOf(optionId);

      if (index > -1) activeOptions.splice(index, 1);
      else activeOptions.push(optionId);

      if (activeOptions.length > 0) params.set(topicId, activeOptions.join(','));
      else params.delete(topicId);
    } else if (topic.type === 'select' || !topicValues) {
      params.set(topicId, optionId);
    }


    window.location.href = `${url.pathname}?${params.toString()}`;
  }

  clearTopicFilters() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    this.topics.forEach((topic) => params.delete(topic.id));
    params.delete('page');

    window.location.href = `${url.pathname}?${params.toString()}`;
  }

  renderSelect(topic: Topic) {
    return html`
      <select @change=${this.selectTopicOption}>
        <option value="" disabled selected>Select...</option>
        ${topic.options.map((option) => html`
            <option value="${topic.id}__${option.id}">${option.name}</option>
          </div>
        `)}
      </select>
    `;
  }

  renderMultiSelect(topic: Topic) {
    return html`
      <select multiple @change=${this.selectTopicOption}>
        <option value="" disabled selected>Select</option>
        ${topic.options.map((option) => html`
            <option value="${topic.id}__${option.id}">${option.name}</option>
          </div>
        `)}
      </select>
    `;
  }

  renderCheckboxes(topic: Topic) {
    return html`
    <div class="options">
      ${topic.options.map((option: TopicOption) => html`
        <div class="option">
          <input type="checkbox" id="${topic.id}__${option.id}" name="${option.name}" value="${topic.id}__${option.id}" @click=${this.selectTopicOption}>
          <label for="${topic.id}__${option.id}">${option.name}</label>
        </div>
      `)}
    </div>
  `;
  }

  get renderedTopics() {
    const renderTopic = (topic: Topic) => {
      if (topic.type === 'multiselect') return this.renderMultiSelect(topic);
      if (topic.type === 'select') return this.renderSelect(topic);
      return this.renderCheckboxes(topic);
    };

    return html`
      ${this.topics.map((topic) => html`
        <div class="topic" data-topic-id="${topic.id}" data-type="${topic.type}">
          <p class="header">${topic.name}</p>
          ${renderTopic(topic)}
        </div>
      `)}
    `;
  }

  render() {
    return html`
      <div class="wrap">
        <div class="intro">
          <p>${this.title}</p>
          ${this.isFilteringActive ? html`<a class="clear" @click=${this.clearTopicFilters}>Clear</a>` : ''}
        </div>

        <div class="topics">
          ${this.renderedTopics}
        </div>

      </div>
    `;
  }
}
