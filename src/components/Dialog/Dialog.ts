import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';

const ANIMATION_DURATION_MS = 250;

@customElement('kps-dialog')
export default class Dialog extends LitElement {
  dialogRef = createRef<HTMLDialogElement>();

  overlayRef = createRef<HTMLDivElement>();

  @state()
  private isOpen = false;

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
    opacity: 0;
    background: rgba(0, 0, 0, 0.5);
    transition: opacity ${ANIMATION_DURATION_MS}ms ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 60;
  }

  #dialog .overlay[visible] {
    opacity: 1;
  }

  #dialog .overlay .container {
    width: 12rem;
    height: 12rem;
    background: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    transform: scale(0.5);
    transition: transform ${ANIMATION_DURATION_MS}ms ease-in-out;
  }

  #dialog .overlay[visible] .container {
    transform: scale(1);
  }
`;

  open = (e: Event) => {
    e.preventDefault();
    if (this.isOpen) return;

    this.dialogRef.value?.setAttribute('open', '');

    setTimeout(() => {
      this.overlayRef.value?.setAttribute('visible', '');
      document.addEventListener('keyup', (ke: KeyboardEvent) => {
        if (ke.key === 'Escape') this.close(e);
      });
      this.isOpen = true;
    }, 0);
  };

  close = (e: Event) => {
    if (!this.isOpen) return;
    e.preventDefault();

    this.overlayRef.value?.removeAttribute('visible');

    setTimeout(() => {
      this.dialogRef.value?.removeAttribute('open');
      document.removeEventListener('keyup', (ke: KeyboardEvent) => {
        if (ke.key === 'Escape') this.close(e);
      });
      this.isOpen = false;
    }, ANIMATION_DURATION_MS);
  };

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
            <div class="header">
              <!-- Close Button -->
              <kps-button @click="${this.close}">
                Close
              </kps-button>
            </div>
            <div class="body">
              <slot name="content"></slot>
            </div>
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
