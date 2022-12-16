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
  type: 'checkbox' | 'select' | 'multiselect' | 'range';
  options: TopicOption[];
  range?: {
    min: number;
    max: number;
  }
}

const url = new URL(window.location.href);
const firstPath = url.pathname.split('/')[1];

function getActiveBlogTopic() {
  const pathArr = url.pathname.split('/');
  const tagIndex = pathArr.indexOf('tag') > -1 ? pathArr.indexOf('tag') : pathArr.indexOf('topic');
  return tagIndex > -1 && pathArr[tagIndex + 1];
}

@customElement('kps-topic-filter')
export default class TopicFilter extends LitElement {
  static styles = [unsafeCSS(Styles)];

  @property({ type: String })
    title = 'Topic Filters';

  @property({ type: Array })
    topics: Array<Topic> = [];

  @property({ type: Boolean })
    blog = false;

  firstUpdated() {
    this.setActiveTopicOptions();
  }

  setActiveTopicOptions() {
    const setupTopicOption = (optionId: string, topicId: string) => {
      const clearEl = this.shadowRoot?.querySelector('.intro .clear');
      const parentEl = this.shadowRoot?.querySelector(`[data-topic-id="${topicId}"]`);
      const childEl = parentEl?.querySelector(`[value="${topicId}__${optionId}"]`);
      const type = parentEl?.getAttribute('data-type');

      if (childEl) {
        clearEl?.classList.remove('hidden');
        parentEl?.querySelector('.clear')?.classList.remove('hidden');

        if (type === 'checkbox') (childEl as HTMLInputElement).checked = true;
        else if (type === 'select') (childEl as HTMLOptionElement).selected = true;
      }
    };

    if (!this.blog) {
      const params = new URLSearchParams(url.search);

      params.forEach((value, key) => {
        const valueArr = value.split(',');
        valueArr.forEach((val) => setupTopicOption(val, key));
      });
    } else {
      const optionId = getActiveBlogTopic();
      if (optionId) setupTopicOption(optionId, this.topics[0].id);
    }
  }

  selectTopicOption(e: Event) {
    const topicOption = (e.target as HTMLInputElement)?.value;
    const [topicId, optionId] = topicOption.split('__');

    if (this.blog) {
      const activeTopic = getActiveBlogTopic();

      if (activeTopic) {
        if (activeTopic === optionId) {
          window.location.href = `/${firstPath}`;
          return;
        }

        const activeOption = `[value="${this.topics[0].id}__${activeTopic}"]`;
        const activeInput = this.shadowRoot?.querySelector(activeOption) as HTMLInputElement;
        if (activeInput?.checked) activeInput.checked = false;
      }

      window.location.href = `/${firstPath}/tag/${optionId}`;
    } else if (topicId && optionId) {
      this.filterByTopicOption(topicId, optionId);
    }
  }

  filterByTopicOption(topicId: string, optionId: string) {
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

  clearTopicFilter(topicId?: string) {
    if (!this.blog) {
      const params = new URLSearchParams(url.search);

      if (topicId) {
        const topic = this.topics.find((t) => t.id === topicId);

        if (topic) params.delete(topic.id);
        params.delete('page');

        window.location.href = `${url.pathname}?${params.toString()}`;
      } else {
        this.topics.forEach((topic) => params.delete(topic.id));
        params.delete('page');

        window.location.href = `${url.pathname}?${params.toString()}`;
      }
    } else {
      window.location.href = `/${firstPath}`;
    }
  }

  renderSelect(topic: Topic) {
    return html`
      <select select @change=${this.selectTopicOption}>
        <option value="" disabled selected > Select...</option>
        ${topic.options.map((option) => html`<option value="${topic.id}__${option.id}">${option.name}</option>`)}
      </select>
    `;
  }

  renderMultiSelect(topic: Topic) {
    return html`
      <select multiple @change=${this.selectTopicOption}>
        <option value="" disabled selected >Select</option>
          ${topic.options.map((option) => html`<option value="${topic.id}__${option.id}">${option.name}</option>`)}
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

  renderRange(topic: Topic) {
    return html`
      <kps-range></kps-range>
    `;
  }

  get renderedTopics() {
    const renderTopic = (topic: Topic) => {
      if (topic.type === 'multiselect') return this.renderMultiSelect(topic);
      if (topic.type === 'select') return this.renderSelect(topic);
      if (topic.type === 'range') return this.renderRange(topic);
      return this.renderCheckboxes(topic);
    };

    return html`
      ${this.topics.map((topic) => html`
        <div class="topic" data-topic-id="${topic.id}" data-type="${topic.type}">
          <div class="header">
            <h5>${topic.name}</h5>
            <a class="clear hidden" @click=${() => this.clearTopicFilter(topic.id)}>Clear</a>
          </div>
          ${renderTopic(topic)}
        </div>
      `)}
    `;
  }

  render() {
    return html`
      <div class="wrap">
        <div class="intro">
          <h4>${this.title}</h4>
          <a class="clear hidden" @click=${() => this.clearTopicFilter()}>Clear all</a>
        </div>
        <div class="topics">
          ${this.renderedTopics}
        </div>
      </div>
    `;
  }
}
