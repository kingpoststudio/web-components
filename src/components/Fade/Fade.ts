import {
  html, LitElement, css, unsafeCSS,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('kps-fade')
export default class Fade extends LitElement {
  @property({ type: Number })
    clientHeight: number = 0;

  @property({ type: Number })
    scrollHeight: number = 0;

  @property({ type: Number })
    scrollTop: number = 0;

  private container: HTMLElement | null = null;

  @state()
  private fade: number = 0;

  static styles = css`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
    }

    .container {
      position: relative;
      transition: opacity 0.1s;
    }
  `;

  constructor() {
    super();
    this.updateFade = this.updateFade.bind(this);
  }

  firstUpdated() {
    this.container = this.shadowRoot!.querySelector('.container');
    this.updateFade();
    window.addEventListener('scroll', this.updateFade);
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.updateFade);
  }

  updateFade() {
    if (!this.container) return;

    this.scrollTop = window.pageYOffset;
    this.scrollHeight = document.documentElement.scrollHeight;
    this.clientHeight = document.documentElement.clientHeight;
    const containerTop = this.container.getBoundingClientRect().top;

    this.fade = (containerTop / this.clientHeight);

    if (this.scrollTop + this.clientHeight >= this.scrollHeight) {
      this.fade = Math.max(this.fade, 1);
    } else if (this.scrollTop <= 0) {
      this.fade = Math.min(this.fade, -1);
    }

    this.container.style.opacity = `${1 - Math.abs(this.fade)}`;
  }

  render() {
    return html`
      <div class="container">
        <slot></slot>
      </div>
    `;
  }
}
