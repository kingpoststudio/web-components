import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';

@customElement('kps-dialog')
export default class Dialog extends LitElement {
  dialogRef = createRef<HTMLDialogElement>();

  @state()
  private isOpen = false;

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  open = (e: Event) => {
    if (this.isOpen) return;
    e.preventDefault();

    this.dialogRef.value?.setAttribute('open', '');
    this.isOpen = true;
  };

  close = () => {
    if (!this.isOpen) return;

    this.dialogRef.value?.removeAttribute('open');
    this.isOpen = false;
  };

  static styles = css`
    dialog > .overlay {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 60;
    }
  `;

  get trigger() {
    return html`
      <kps-button @click="${this.open}"><slot name="trigger"></slot></kps-button>
    `;
  }

  get content() {
    return html`
      <dialog ${ref(this.dialogRef)}>
        <div class="overlay">
          <div>
            <slot name="content"></slot>
          </div>
        </div>
      </dialog>
    `;
  }

  render() {
    return html`
      <div class="trigger">${this.trigger}</div>
      <div class="content">${this.content}</div>
    `;
  }
}
