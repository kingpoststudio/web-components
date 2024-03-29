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
    hubspot = true;

  @property({ type: String, attribute: 'form-id' })
    formId = '';

  @property({ type: String, attribute: 'portal-id' })
    portalId = '';

  @property({ type: String })
    target = '';

  static styles = css`
  `;

  private initHsFormScript() {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    document.body.appendChild(script);
    const { formId, portalId, target } = this;

    script.addEventListener('load', () => {
      window.hbspt.forms.create({
        portalId,
        formId,
        target,
        cssClass: 'kps-form',
      });
    });
  }

  firstUpdated() {
    if (this.hubspot && this.formId && this.portalId) {
      this.initHsFormScript();
    }
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
