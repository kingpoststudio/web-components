import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './Button.css';

@customElement('kps-button')
export default class Button extends LitElement {
  @property({ type: String })
    color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'transparent' = 'primary';

  @property({ type: String })
    theme: 'base' | 'dark' | 'darker' | 'darkest' | 'light' | 'lighter' | 'lightest' = 'base';

  @property({ type: String })
    variant: 'fill' | 'outline' = 'fill';

  @property({ type: String })
    size: 'icon' | 'sm' | 'md' | 'lg' = 'md';

  @property({ type: String })
    href = '';

  @property({ type: String })
    target = '_self';

  @property({ type: Boolean })
    active = false;

  @property({ type: Boolean })
    cta = false;

  @property({ type: Boolean })
    round = false;

  @property({ type: Boolean })
    uppercase = false;

  @property({ type: Boolean })
    shadow = false;

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
      transition: background-color var(--ease-time) var(--ease-type), border-color var(--ease-time) var(--ease-type);
    }

    .wrap[size="icon"] > a {
      display: flex;
      align-items: center;
      min-width: auto;
      padding: 0.75rem 1rem;
    }

    .wrap[size="lg"] > a {
      min-width: 9rem;
      padding: 0.75rem 1.25rem;
      font-size: var(--font-size-lg);
    }

    .wrap[size="xl"] > a {
      min-width: 12rem;
      padding: 1.25rem 2rem;
      font-size: var(--font-size-lg);
    }

    .wrap > a:hover {
      background: var(--color-secondary-darkest);
    }

    .wrap[color="secondary"] > a {
      color: var(--color-font);
      background: var(--color-secondary);
    }

    .wrap[color="secondary"][theme="dark"] > a {
      background: var(--color-secondary-dark);
    }

    .wrap[color="secondary"][theme="darker"] > a {
      background: var(--color-secondary-darker);
    }

    .wrap[color="secondary"][theme="darkest"] > a {
      color: var(--color-white);
      background: var(--color-secondary-darkest);
    }

    .wrap[color="secondary"] > a:hover {
      background: var(--color-secondary-darkest);
    }

    .wrap[color="white"] > a {
      color: var(--color-font);
      background: var(--color-white);
    }

    .wrap[color="white"] > a:hover {
      background: var(--color-gray-lightest);
    }

    .wrap[color="transparent"] > a {
      background: var(--color-transparent);
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

    .wrap[variant="outline"] > a {
      border: 1px solid var(--color-white);
      background: transparent;
    }

    .wrap[variant="outline"] > a:hover {
      background: var(--color-primary);
      border-color: var(--color-primary);
    }

    .wrap[variant="outline"][size="icon"] > a {
      border: 1px solid var(--color-gray-light);
      color: var(--color-gray-light);
    }

    .wrap[variant="outline"][size="icon"] > a:hover {
      color: var(--color-white);
      border-color: 1px solid var(--color-primary);
    }

    .wrap[variant="outline"][color="primary"][theme="darkest"] > a {
      background: var(--color-white);
      border-color: var(--color-primary-darkest);
      color: var(--color-primary-darkest);
    }

    .wrap[variant="outline"][color="primary"][theme="darkest"] > a:hover {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-white);
    }

    .wrap[active="true"][size="icon"][variant="outline"] > a {
      color: var(--color-white);
      background: var(--color-primary);
      border-color: var(--color-primary);
    }

    .wrap[shadow] > a {
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
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
        variant="${this.variant}"
        color="${this.color}"
        theme="${this.theme}"
        size="${this.size}"
        round="${this.round}"
        shadow="${this.shadow}"
        uppercase="${this.uppercase}"
        active="${this.active}"
      >
        <a href="${this.href}" target="${this.target}">
          <slot @slotchange=${this.onSlotChange}></slot>
        </a>
      </div>
    `;
  }
}
