import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

declare global {
  interface Window {
      hbspt: any;
  }
}

@customElement('kps-form')
export default class Form extends LitElement {
  @property({ type: Boolean })
    isHsForm = true;

  @property({ type: String })
    formId = '';

  @property({ type: String })
    portalId = '';

  static styles = css`
`;

  firstUpdated() {
    if (this.isHsForm && this.formId && this.portalId) {
      window.hbspt.forms.create({
        portalId: this.portalId,
        formId: this.formId,
        target: '.form-container',
      });
    }
  }

  render() {
    return html`
      <div class="form-container"></div>
    `;
  }
}
