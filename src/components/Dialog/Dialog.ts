import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';

@customElement('kps-dialog')
export default class Dialog extends LitElement {
  dialogRef = createRef<HTMLDialogElement>();

  overlayRef = createRef<HTMLDivElement>();

  @state()
  private isOpen = false;

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  open = (e: Event) => {
    if (this.isOpen) return;
    e.preventDefault();

    this.dialogRef.value?.setAttribute('open', '');

    setTimeout(() => {
      this.overlayRef.value?.setAttribute('visible', '');
      this.isOpen = true;
    }, 0);
  };

  close = () => {
    if (!this.isOpen) return;

    this.dialogRef.value?.removeAttribute('open');
    this.isOpen = false;
  };

  static styles = css`
    #dialog {
      display: none;
    }

    #dialog[open] {
      display: block;
    }

    #dialog .overlay {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      opacity: 0%;
      background: rgba(0, 0, 0, 0.5);
      transition: opacity 250ms ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 60;
    }

    #dialog[open] .overlay[visible] {
      opacity: 1;
    }

    #dialog > .container {
      width: 12rem;
      height: 12rem;
      background: #fff;
      border-radius: 0.5rem;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.25);
      display: flex;
      flex-direction: column;
    }
  `;

  get trigger() {
    return html`
      <kps-button @click="${this.open}"><slot name="trigger"></slot></kps-button>
    `;
  }

  get content() {
    return html`
      <div id="dialog" ${ref(this.dialogRef)}>
        <div class="overlay" ${ref(this.overlayRef)}>
          <div class="container">
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="trigger">${this.trigger}</div>
      <div class="content">${this.content}</div>
    `;
  }
}
