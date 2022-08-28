// create a new lit-element called "kps-tab" with imports.
import { LitElement, html, css } from 'lit';

export default class Tab extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        overflow: hidden;
        height: 100%;
        width: 100%;
        background-color: var(--kps-tab-background-color, #f5f5f5);
        color: var(--kps-tab-color, #000);
        font-size: var(--kps-tab-font-size, 14px);
        font-weight: var(--kps-tab-font-weight, normal);
        font-style: var(--kps-tab-font-style, normal);
        font-family: var(--kps-tab-font-family, sans-serif);
        border-radius: var(--kps-tab-border-radius, 0);
        border: var(--kps-tab-border, none);
        box-shadow: var(--kps-tab-box-shadow, none);
        transition
          : var(--kps-tab-transition, all 0.2s ease-in-out);
      }
      :host([hidden]) {
        display: none;
      }
      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }
      :host([active]) {
        background-color: var(--kps-tab-active-background-color, #fff);
        color: var(--kps-tab-active-color, #000);
      }
      :host([active]) ::slotted(*) {
        color: var(--kps-tab-active-color, #000);
      }

      ::slotted(*) {
        display: block;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: var(--kps-tab-line-height, 1.5);
        font-size: var(--kps-tab-font-size, 14px);
        font-weight: var(--kps-tab-font-weight, normal);
        font-style: var(--kps-tab-font-style, normal);
        font-family: var(--kps-tab-font-family, sans-serif);
        color: var(--kps-tab-color, #000);
        transition
          : var(--kps-tab-transition, all 0.2s ease-in-out);
      }
      ::slotted(:hover) {
        color: var(--kps-tab-active-color, #000);
      }
      ::slotted(:focus) {
        outline: none;
      }
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}
