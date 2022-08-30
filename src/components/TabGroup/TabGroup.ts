import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

const styles = css`
  .tabs {
    position: absolute;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--ease-time) var(--ease-type), box-shadow var(--ease-time) var(--ease-type);
  }

  .tabs ::slotted(kps-tab) {
    display: inline-flex;
    width: fit-content;
    margin: var(--space) calc(var(--space) * 2);
  }

  .tabs ::slotted(:first-child) {
    margin-top: var(--space-md);
  }

  .tabs ::slotted(:last-child) {
    margin-bottom: var(--space-md);
  }

  .wrap[isOpen=true] .tabs {
    height: fit-content;
    max-height: 16rem;
    border-bottom: 1px solid var(--color-gray-lightest);
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
    .tabs {
      position: relative;
      display: inline-flex;
      flex-direction: row;
      max-height: none;
    }

    .tabs ::slotted(kps-tab) {
      margin: 0 var(--space);
    }

    .tabs ::slotted(:first-child) {
      margin-top: 0;
      margin-left: 0;
    }

    .tabs ::slotted(:last-child) {
      margin-bottom: 0;
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

  @property({ type: String, attribute: 'trigger-label' })
    triggerLabel = '';

  private toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  render() {
    return html`
      <div class="wrap" isOpen="${this.isOpen}">

        <div class="trigger" @click="${this.toggleOpen}">
          <span>${this.triggerLabel || 'Select'}</span>
          <kps-icon icon="chevron"></kps-icon>
        </div>

        <div class="tabs">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
