import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import resourceViewStyles from './ResourceView.css?inline';

@customElement('kps-resource-view')
export default class ResourceView extends LitElement {
  static styles = unsafeCSS(resourceViewStyles);

  @property({ type: String })
    docUrl = '';

  @property({ type: String })
    backUrl = '';

  @property({ type: String })
    downloadLabel = 'Download PDF';

  @property({ type: String })
    formId: string | undefined;

  private downloadResource() {
    if (this.docUrl) window.open(this.docUrl, '_blank');
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('message', (event) => {
      if (event.data.eventName === 'onFormSubmitted' && event.data.id === this.formId) {
        this.downloadResource();
      }
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('message', (event) => {
      if (event.data.eventName === 'onFormSubmitted' && event.data.id === this.formId) {
        this.downloadResource();
      }
    });
  }

  get downloadButton() {
    if (this.formId) {
      return html`
      <div class="form">
        <h6>Download this resource</h6>
        <slot name="form"></slot>
      </div>
    `;
    }

    return html`
      <a class="link download" @click=${this.downloadResource}>
        <span>${this.downloadLabel}</span>
        <kps-icon icon="download"></kps-icon>
      </a>
    `;
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="image">
          <slot name="image"></slot>
        </div>
        <div class="resource">
          <slot name="type"></slot>
          <slot name="title"></slot>
          <slot name="subtitle"></slot>
          <hr /> 
          ${this.downloadButton}
          <slot name="description"></slot>
        </div>
      </div>
    `;
  }
}
