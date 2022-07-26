import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './Button.css';

@customElement('kps-button')
export default class Button extends LitElement {
  @property({ type: String })
    variant: 'fill' | 'outline' = 'fill';

  @property({ type: String })
    color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' = 'primary';

  @property({ type: Boolean })
    rounded = false;

  @property({ type: String })
    href = '';

  @property({ type: String })
    target = '_self';

  @property({ type: Boolean })
    isCta = false;

  static styles = css`
    .wrap {
      display: inline-flex;
      position: relative;
      margin: 0.25rem;
      z-index: 1;
    }

    .wrap > a {
      padding: 0.5rem 1rem;
      color: var(--color-white);
      background: var(--color-primary);
      text-decoration: none;
      cursor: pointer;
      transition: all var(--ease-time) var(--ease-type);
    }

    .wrap > a:hover {
      background: var(--color-primary-dark);
    }

    .wrap[rounded=true] > a {
      border-radius: 0.5rem;
    }

    .wrap[color="secondary"] > a {
      color: var(--color-font);
      background: var(--color-secondary);
    }

    .wrap[color="secondary"] > a:hover {
      background: var(--color-secondary-dark);
    }

    .wrap[color="success"] > a {
      background: var(--color-success);
    }

    .wrap[color="success"] > a:hover {
      background: var(--color-success-dark);
    }

    .wrap[color="warning"] > a {
      background: var(--color-warning);
    }

    .wrap[color="warning"] > a:hover {
      background: var(--color-warning-dark);
    }

    .wrap[color="error"] > a {
      background: var(--color-error);
    }

    .wrap[color="error"] > a:hover {
      background: var(--color-error-dark);
    }
  `;

  /**
   * onSlotChange
   * @param e
   * @returns void
   * Listening for a slotchange event to detect when the HubSpot CTA HTML is added
   * to the slot. Once the CTA is available, we take it's href and target attributes
   * and set them on the <a> tag.
   */
  onSlotChange(e: { target: HTMLSlotElement }) {
    if (!this.isCta) return;
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
      <div class="wrap"
        variant=${this.variant}
        color=${this.color}
        rounded=${this.rounded}
      >
        <a href="${this.href}" target="${this.target}">
          <slot @slotchange=${this.onSlotChange}></slot>
        </a>
      </div>
    `;
  }
}
