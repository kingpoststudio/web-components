import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

const styles = css`
  .wrap {
    position: relative;
    z-index: 10;
  }

  .options {
    position: absolute;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 0;
    background: white;
    overflow: hidden;
    transition: max-height var(--ease-time) var(--ease-type);
  }

  .overlay {
    content: "";
    position: absolute;
    top: 100%;
    left: -1.5rem;
    display: block;
    width: 100vw;
    height: 0;
    background: linear-gradient(to bottom, var(--color-overlay), transparent);
    opacity: 0;
    transition: opacity var(--ease-time) var(--ease-type);
  }

  .options ::slotted(option) {
    display: inline-flex;
    width: fit-content;
    min-height: fit-content;
    margin: var(--space) calc(var(--space) * 2);
    position: relative;
    padding-bottom: 0.5rem;
    color: var(--color-gray-light);
    font-size: var(--font-size-lg);
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: color var(--ease-time) var(--ease-type);
  }

  .options ::slotted(option):after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 2px;
    background-color: var(--color-transparent);
    transition: background-color var(--ease-time) var(--ease-type);
  }

  .options ::slotted(option:hover),
  .options ::slotted(option[selected]) {
    color: var(--color-black);
  }

  .options ::slotted(option[selected]):after {
    background-color: var(--color-primary-dark);
  }

  .options ::slotted(:first-child) {
    margin-top: var(--space-md);
  }

  .options ::slotted(:last-child) {
    margin-bottom: var(--space-md);
  }

  .wrap[isOpen=true] .options {
    height: fit-content;
    max-height: 16rem;
    border-bottom: 1px solid var(--color-gray-lightest);
  }

  .wrap[isOpen=true] .overlay {
    height: 100vh;
    opacity: 1;
  }

  .trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space);
    border-top: 1px solid var(--color-gray-lightest);
    border-bottom: 1px solid var(--color-gray-lightest);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    user-select: none;
    transition: border-color var(--ease-time) var(--ease-type);
  }

  .trigger:hover {
    border-color: var(--color-gray-light);
  }

  .wrap .trigger kps-icon {
    transform: rotate(180deg);
    transition: transform var(--ease-time) var(--ease-type);
  }

  .wrap[isOpen=true] .trigger kps-icon {
    transform: rotate(0deg);
  }

  @media (min-width: 768px) {
    .options {
      position: relative;
      display: inline-flex;
      flex-direction: row;
      max-height: none;
    }

    .options ::slotted(option) {
      margin: 0 var(--space);
    }

    .options ::slotted(:first-child) {
      margin-top: 0;
      margin-left: 0;
    }

    .options ::slotted(:last-child) {
      margin-bottom: 0;
      margin-right: 0;
    }

    .overlay,
    .trigger {
      display: none;
    }
  }
`;

@customElement('kps-select')
export default class Select extends LitElement {
  static styles = styles;

  @state()
  private isOpen = false;

  @property({ type: String })
  private variant: 'nav' | undefined;

  @property({ type: String })
  private placeholder = 'Select';

  private toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  private onResize() {
    if (window.innerWidth > 768) {
      this.isOpen = false;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.variant === 'nav') {
      window.addEventListener('resize', () => this.onResize());
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.variant === 'nav') {
      window.removeEventListener('resize', () => this.onResize());
    }
  }

  onOptionClick(e: Event) {
    if (e.target instanceof HTMLOptionElement) {
      const { value } = e.target;
      Array.from(this.querySelectorAll('option')).forEach((child) => child.removeAttribute('selected'));
      e.target.setAttribute('selected', '');

      if (this.variant === 'nav' && value) {
        this.isOpen = false;
        window.location.href = value;
      }
    }
  }

  render() {
    return html`
      <div class="wrap" isOpen="${this.isOpen}" @click="${this.onOptionClick}">

        <div class="trigger" @click="${this.toggleOpen}">
          <span>${this.placeholder}</span>
          <kps-icon icon="chevron"></kps-icon>
        </div>

        ${this.variant === 'nav' ? html`<div class="overlay" @click="${this.toggleOpen}"></div>` : html`<div @click="${this.toggleOpen}"></div>`}

        <div class="options">
          <slot></slot>
        </div>

      </div>
    `;
  }
}
