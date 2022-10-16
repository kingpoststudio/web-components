import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';

const ANIMATION_DURATION_MS = 200;

const styles = css`
  .trigger {
    position: relative;
    display: inline-block;
    user-select: none;
  }

  .trigger[variant="dropdown"] {
    max-width: 12rem;
    font-size: 0.75rem;
    white-space: nowrap;
  }

  .trigger[variant="dropdown"]:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: calc((6.5rem - 100%) / 2 * -1);
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    width: 100%;
    height: calc(6.5rem - 100%);
    opacity: 0;
    left: 0px;
    width: 100%;
    background: var(--color-secondary-darkest);
    transition: opacity var(--ease-time) var(--ease-type);
  }

  .trigger[variant="dropdown"].triggered:after {
    opacity: 1;
  }

  .content {
    position: relative;
    z-index: 100;
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

  dialog[variant="modal"] .overlay {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    background: rgba(0, 0, 0, 0.6);
    transition: opacity var(--ease-time) var(--ease-type);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  dialog[theme="dark"] .overlay {
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

  dialog[variant="modal"] .container {
    min-width: 16rem;
    width: fit-content;
    max-width: 48rem;
    height: fit-content;
    max-height: 40rem;
    background: var(--color-white);
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.25);
    transform: scale(0.5);
    transition: transform var(--ease-time) var(--ease-type);
  }

  dialog[variant="modal"] .overlay[visible] .container {
    transform: scale(1);
  }

  dialog .container .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-lg) var(--space-lg) var(--space-sm);
  }

  dialog .container .header kps-icon {
    color: var(--color-gray-light);
    cursor: pointer;
    transition: color var(--ease-time) var(--ease-type);
  }

  dialog .container .header kps-icon:hover {
    color: var(--color-black);
  }

  dialog[theme="dark"] .container .header kps-icon {
    color: var(--color-white);
  }

  dialog[theme="dark"] .container .header kps-icon:hover {
    color: var(--color-secondary-lighter);
  }


  dialog .container .body {
    flex: 1;
    padding: var(--space-lg);
    overflow: auto;
  }

  dialog[variant="dropdown"] {
    position: fixed;
    top: 6.5rem;
    right: 0;
    left: auto;
    display: none;
    width: 100%;
  }

  dialog[variant="dropdown"][open] {
    display: flex;
  }

  dialog[variant="dropdown"] .overlay {
    width: 100%;
    overflow: hidden;
  }

  dialog[variant="dropdown"] .overlay:after {
    content: "";
    position: absolute;
    top: 0;
    left: 100%;
    width: 100vw;
    height: 100%;
    opacity: 0;
    background: linear-gradient(var(--color-secondary-darkest), var(--color-gray-light));
    transition: opacity var(--ease-time) var(--ease-type);
  }

  dialog[variant="dropdown"][open] .overlay:after {
    opacity: 1;
  }

  dialog[variant="dropdown"] .container {
    width: 100%;
    max-height: calc(100vh - 7.8rem);
    padding: var(--space-sm);
    background: linear-gradient(var(--color-secondary-darkest), var(--color-gray-light));
  }

  dialog[variant="dropdown"] .container .body {
    position: relative;
    right: -3rem;
    padding-block: var(--space-lg);
    padding-right: var(--space-3xl);
  }

  @media (min-width: 768px) {
    .trigger[variant="dropdown"] {
      max-width: 16rem;
      font-size: 1rem;
    }

    dialog[variant="dropdown"] {
      position: absolute;
      top: calc(100% + 2rem);
      min-width: 40rem;
      max-height: calc(100vh - 10rem);
      border-bottom-left-radius: 0.5rem;
    }

    dialog[variant="dropdown"] .overlay {
      display: flex;
      border-bottom-left-radius: 0.5rem;
    }

    dialog[variant="dropdown"] .container {
      overflow-y: auto;
      max-height: 100%;
    }

    dialog[variant="dropdown"] .container .body {
      padding: var(--space-lg);
      right: auto;
    }
  }
`;

@customElement('kps-dialog')
export default class Dialog extends LitElement {
  dialogRef = createRef<HTMLDialogElement>();

  overlayRef = createRef<HTMLDivElement>();

  @property({ type: String })
  private variant: 'modal' | 'dropdown' = 'modal';

  @property({ type: String })
  private theme: 'light' | 'dark' = 'light';

  @property({ type: Boolean })
  private button = true;

  @state()
  private isOpen = false;

  static styles = styles;

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

  handleClick = (e: Event) => {
    if (!this.isOpen) this.open(e);
    else this.close(e);
  };

  get trigger() {
    return this.useButton ? html`
      <kps-button color="${this.isOpen ? 'secondary' : 'primary'}" theme="${this.isOpen ? 'darkest' : 'base'}" uppercase @click="${this.handleClick}">
        <slot name="trigger"></slot>
      </kps-button>
    ` : html`
      <div @click="${this.handleClick}">
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
              <div class="title">
                <slot name="title"></slot>
              </div>
              <kps-icon icon="crossCircle" @click="${this.close}"></kps-icon>
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
