import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';

const ANIMATION_DURATION_MS = 200;

@customElement('kps-dialog')
export default class Dialog extends LitElement {
  dialogRef = createRef<HTMLDialogElement>();

  overlayRef = createRef<HTMLDivElement>();

  @property({ type: String })
  private variant: 'modal' | 'dropdown' = 'modal';

  @property({ type: String })
  private theme: 'light' | 'dark' = 'light';

  @state()
  private isOpen = false;

  static styles = css`
  .trigger {
    display: inline-block;
  }

  dialog {
    display: none;
    padding: 0;
    background: none;
    border: none;
  }

  dialog[open] {
    display: block;
  }

  dialog[variant='modal'] .overlay {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    background: rgba(0, 0, 0, 0.25);
    transition: opacity ${ANIMATION_DURATION_MS}ms ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 60;
  }

  dialog[variant='modal'] .overlay[visible] {
    opacity: 1;
  }

  dialog[theme="dark"] .overlay {
    background: var(--color-black);
    color: var(--color-white);
  }

  dialog .container {
    display: flex;
    flex-direction: column;
  }

  dialog[variant='modal'] .container {
    min-width: 16rem;
    max-width: 90%;
    min-height: 16rem;
    max-height: 90%;
    background: var(--color-white);
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.25);
    transform: scale(0.5);
    transition: transform ${ANIMATION_DURATION_MS}ms ease-in-out;
  }

  dialog[variant='modal'] .overlay[visible] .container {
    transform: scale(1);
  }

  dialog .container .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-sm);
  }

  dialog .container .header kps-icon {
    color: var(--color-gray-light);
    cursor: pointer;
    transition: color ${ANIMATION_DURATION_MS}ms ease-in-out;
  }

  dialog .container .header kps-icon:hover {
    color: var(--color-black);
  }

  dialog .container .body {
    flex: 1;
    padding: var(--space-sm);
    overflow: auto;
  }

  dialog[variant="dropdown"] {
    left: auto;
    right: auto;
  }

  dialog[variant="dropdown"][open] {
    display: inline;
    position: relative;
    left: 0.25rem;
    top: -0.25rem;
  }

  dialog[variant="dropdown"] .container {
    padding: var(--space-sm);
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
      <div @click="${this.open}">
        <slot name="trigger"></slot>
      </div>
    `;
  }

  get content() {
    return html`
      <dialog ${ref(this.dialogRef)} variant="${this.variant}" theme="${this.theme}">
        <div class="overlay" ${ref(this.overlayRef)}>
          <div class="container">
            <div class="header">
              <slot name="title"></slot>
              <kps-icon icon="cross" @click="${this.close}"></kps-icon>
            </div>
            <div class="body">
              <slot name="content"></slot>
            </div>
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
