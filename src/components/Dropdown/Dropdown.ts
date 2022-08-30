import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const styles = css`
`;

@customElement('kps-dropdown')
export default class Dropdown extends LitElement {
  static styles = styles;

  @state()
  private isOpen = false;

  open = (e: Event) => {
    e.preventDefault();
    if (this.isOpen) return;

    setTimeout(() => {
      this.isOpen = true;
    }, 0);
  };

  close = (e: Event) => {
    if (!this.isOpen) return;
    e.preventDefault();

    this.isOpen = false;

    setTimeout(() => {
    }, 200);
  };

  render() {
    return html`
    <div class="wrap">
      <div class="trigger" @click=${this.open}>
        <slot name="trigger"></slot>
      </div>
      <div class="options" ?hidden=${!this.isOpen}>
        <slot name="options"></slot>
      </div>
    </div>
  `;
  }
}
