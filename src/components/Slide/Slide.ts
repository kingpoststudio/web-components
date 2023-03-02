import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import slideStyles from './Slide.css?inline';

@customElement('kps-slide')
export default class Slide extends LitElement {
  static styles = unsafeCSS(slideStyles);

  render() {
    return html`
      <div class="wrapper">
        <slot name="image"></slot>
        <div class="overlay"></div>
        <div class="content">
          <div class="text"><slot name="title"></slot></div>
          <div class="text"><slot name="description"></slot></div>
          <slot name="action"></slot>
        </div>
      </div>
    `;
  }
}
