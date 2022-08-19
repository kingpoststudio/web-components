import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './Button.css';

@customElement('kps-button')
export default class Button extends LitElement {
  @property({ type: String })
  private color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'transparent' = 'primary';

  @property({ type: String })
  private theme: 'base' | 'dark' | 'darker' | 'darkest' | 'light' | 'lighter' | 'lightest' = 'base';

  @property({ type: String })
  private variant: 'fill' | 'outline' = 'fill';

  @property({ type: String })
  private href = '';

  @property({ type: String })
  private target = '_self';

  @property({ type: Boolean })
  private cta = false;

  @property({ type: Boolean })
  private round = false;

  @property({ type: Boolean })
  private uppercase = false;

  static styles = css`
    :host {
      display: inline-flex;
    }

    .wrap {
      display: flex;
      position: relative;
      z-index: 1;
    }

    .wrap > a {
      min-width: 6rem;
      padding: 0.5rem 1rem;
      color: var(--color-white);
      background: var(--color-primary);
      font-weight: 500;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      transition: background-color var(--ease-time) var(--ease-type);
    }

    .wrap > a:hover {
      background: var(--color-secondary-darkest);
    }

    .wrap[color=secondary] > a {
      color: var(--color-font);
      background: var(--color-secondary);
    }

    .wrap[color=secondary][theme=dark] > a {
      background: var(--color-secondary-dark);
    }

    .wrap[color=secondary][theme=darker] > a {
      background: var(--color-secondary-darker);
    }

    .wrap[color=secondary][theme=darkest] > a {
      color: var(--color-white);
      background: var(--color-secondary-darkest);
    }

    .wrap[color=secondary] > a:hover {
      background: var(--color-secondary-darkest);
    }

    .wrap[color=transparent] > a {
      background: var(--color-transparent);
    }

    .wrap[color=success] > a {
      background: var(--color-success);
    }

    .wrap[color=success] > a:hover {
      background: var(--color-success-dark);
    }

    .wrap[color=warning] > a {
      background: var(--color-warning);
    }

    .wrap[color=warning] > a:hover {
      background: var(--color-warning-dark);
    }

    .wrap[color=error] > a {
      background: var(--color-error);
    }

    .wrap[color=error] > a:hover {
      background: var(--color-error-dark);
    }

    .wrap[variant=outline] > a {
      border: 1px solid var(--color-white);
      background: transparent;
    }

    .wrap[variant=outline] > a:hover {
      background: var(--color-primary);
      border-color: var(--color-primary);
    }

    .wrap[round] > a {
      border-radius: 0.5rem;
    }

    .wrap[uppercase] > a {
      text-transform: uppercase;
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
      <div class="wrap"
        variant=${this.variant}
        color=${this.color}
        theme=${this.theme}
        round=${this.round}
        uppercase=${this.uppercase}
      >
        <a href="${this.href}" target="${this.target}">
          <slot @slotchange=${this.onSlotChange}></slot>
        </a>
      </div>
    `;
  }
}
