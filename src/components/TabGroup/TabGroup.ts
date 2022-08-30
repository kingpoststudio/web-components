import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const styles = css`
  .tabs {
    display: none;
    flex-direction: column;
    width: 100%;
    padding-block: 1rem;
  }

  .tabs ::slotted(:not(kps-tab)) {
    display: none;
  }

  .tabs ::slotted(kps-tab) {
    display: inline-flex;
    width: fit-content;
    padding-bottom: 0.125rem;
  }

  .tabs ::slotted(kps-tab) {
    margin: var(--space);
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
  }

  .wrap .trigger kps-icon {
    transform: rotate(180deg);
    transition: transform var(--ease-time) var(--ease-type);
  }

  .wrap[isOpen=true] .trigger kps-icon {
    transform: rotate(0deg);
  }

  .wrap[isOpen=true] .tabs {
    display: flex;
  }

  @media (min-width: 768px) {
    .tabs {
      position: relative;
      display: inline-flex;
      flex-direction: row;
    }

    .tabs ::slotted(kps-tab) {
      margin: 0 var(--space);
    }

    .tabs ::slotted(:first-child) {
      margin-left: 0;
    }

    .tabs ::slotted(:last-child) {
      margin-right: 0;
    }

    .trigger {
      display: none;
    }
  }
`;

@customElement('kps-tab-group')
export default class TabGroup extends LitElement {
  static styles = styles;

  @state()
    isOpen = false;

  @state()
    activeTab: Element | null = null;

  firstUpdated() {
    this.activeTab = this.querySelector('kps-tab[active]');
  }

  private toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  render() {
    return html`
      <div class="wrap" isOpen="${this.isOpen}">
        <div class="trigger" @click="${this.toggleOpen}">
          <span>${this.activeTab?.innerHTML}</span>
          <kps-icon icon="chevron"></kps-icon>
        </div>
        <div class="tabs">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
