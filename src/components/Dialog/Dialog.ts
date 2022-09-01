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

  .trigger[variant=dropdown] {
    max-width: 12rem;
    font-size: 0.75rem;
  }

  @media (min-width: 768px) {
    .trigger[variant=dropdown] {
      max-width: 16rem;
      font-size: 1rem;
    }
  }

  .trigger[variant=dropdown]:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% + 2.08rem);
    opacity: 0;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    background: var(--color-secondary-darkest);
    transition: opacity ${ANIMATION_DURATION_MS}ms var(--ease-type);
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
    transition: opacity ${ANIMATION_DURATION_MS}ms var(--ease-type);
  }

  dialog[variant=modal] .overlay {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    background: rgba(0, 0, 0, 0.25);
    transition: opacity ${ANIMATION_DURATION_MS}ms var(--ease-type);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  dialog[theme=dark] .overlay {
    background: var(--color-black);
    color: var(--color-white);
  }

  dialog .overlay[visible] {
    opacity: 1;
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
    transition: transform ${ANIMATION_DURATION_MS}ms var(--ease-type);
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
    position: absolute;
    top: calc(100% + 2.08rem);
    right: 0;
    left: auto;
    display: none;
    min-width: 36rem;
    width: 100%;
    border-bottom-left-radius: 0.5rem;
  }

  dialog[variant=dropdown][open] {
    display: flex;
  }

  dialog[variant=dropdown] .overlay {
    width: 100%;
    border-bottom-left-radius: 1rem;
    overflow: hidden;
  }

  dialog[variant=dropdown] .overlay:after {
    content: "";
    position: absolute;
    top: 0;
    left: 100%;
    width: 100vw;
    height: 100%;
    opacity: 0;
    background: linear-gradient(var(--color-secondary-darkest), var(--color-gray-light));
    transition: opacity 150ms var(--ease-type);
  }

  dialog[variant=dropdown][open] .overlay:after {
    opacity: 1;
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
      <kps-button color="${this.isOpen ? 'secondary' : 'primary'}" theme="${this.isOpen ? 'darkest' : 'base'}" uppercase @click="${this.open}">
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
              <div class="title">
                <slot name="title"></slot>
              </div>
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
