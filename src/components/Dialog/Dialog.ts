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
    position: relative;
    display: inline-block;
  }

  .trigger[variant=dropdown]:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4.5rem;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    opacity: 0;
    background: var(--color-secondary-darkest);
    transition: opacity var(--ease-time) var(--ease-type);
  }

  .trigger[variant=dropdown].triggered:after {
    opacity: 1;
  }

  .content {
    position: relative;
  }

  dialog {
    position: relative;
    display: none;
    padding: 0;
    background: none;
    border: none;
  }

  dialog[open] {
    display: block;
  }

  dialog .overlay {
    z-index: 60;
    opacity: 0;
    transition: opacity var(--ease-time) var(--ease-type);
  }

  dialog .overlay[visible] {
    opacity: 1;
  }

  dialog[variant=modal] .overlay {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    background: rgba(0, 0, 0, 0.25);
    transition: opacity var(--ease-time) var(--ease-type);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  dialog[theme=dark] .overlay {
    background: var(--color-black);
    color: var(--color-white);
  }

  dialog .container {
    display: flex;
    flex-direction: column;
  }

  dialog[variant=modal] .container {
    min-width: 16rem;
    max-width: 90%;
    min-height: 16rem;
    max-height: 90%;
    background: var(--color-white);
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.25);
    transform: scale(0.5);
    transition: transform var(--ease-time) var(--ease-type);
  }

  dialog[variant=modal] .overlay[visible] .container {
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

  dialog[variant=dropdown] {
    left: auto;
    right: auto;
    min-width: 36rem;
  }

  dialog[variant=dropdown][open] {
    position: absolute;
    top: 2rem;
    right: 0;
    display: flex;
    width: 100%;
  }

  dialog[variant=dropdown] .overlay:after {
    content: "";
    position: absolute;
    top: 0;
    left: 100%;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: linear-gradient(var(--color-secondary-darkest), var(--color-gray-light));
    transition: opacity var(--ease-time) var(--ease-type);
  }

  dialog[variant=dropdown][open] .overlay:after {
    opacity: 1;
  }

  dialog[variant=dropdown][open] .overlay {
    width: 100%;
  }

  dialog[variant=dropdown] .container {
    padding: var(--space-sm);
    background: linear-gradient(var(--color-secondary-darkest), var(--color-gray-light));
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
    this.isOpen = false;

    setTimeout(() => {
      this.dialogRef.value?.removeAttribute('open');
      document.removeEventListener('keyup', (ke: KeyboardEvent) => {
        if (ke.key === 'Escape') this.close(e);
      });
    }, ANIMATION_DURATION_MS);
  };

  get trigger() {
    return html`
      <kps-button color="${this.isOpen ? 'transparent' : 'primary'}" uppercase @click="${this.open}">
        <slot name="trigger"></slot>
      </kps-button>
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
      <div class="trigger${this.isOpen ? ' triggered' : ''}" variant="${this.variant}">${this.trigger}</div>
      <div class="content">${this.content}</div>
    `;
  }
}
