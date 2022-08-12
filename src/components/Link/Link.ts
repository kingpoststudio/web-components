import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('kps-link')
export default class Link extends LitElement {
  @property({ type: String })
    href = '';

  @property({ type: String })
    target = '_self';

  @property({ type: Boolean })
    cta = false;

  @property({ type: Boolean })
    uppercase = false;

  /**
   * onSlotChange
   * @param e
   * @returns void
   * Listening for a slotchange event to detect when the HubSpot CTA HTML is added
   * to the slot. Once the CTA is available, we take it's href and target attributes
   * and set them on the <a> tag.
   */
  onSlotChange(e: { target: HTMLSlotElement }) {
    if (!this.cta) return;
    const ctaLink = e.target.assignedElements()[0].querySelector('a');

    if (ctaLink) {
      const href = ctaLink.getAttribute('href');
      const target = ctaLink.getAttribute('target');

      if (href) this.href = href;
      if (target) this.target = target;
    }
  }

  render() {
    return html`
      <a href="${this.href}" target="${this.target}">
        <slot @slotchange=${this.onSlotChange}></slot>
      </a>
    `;
  }
}
