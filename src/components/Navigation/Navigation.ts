import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import Button from '../Button/Button';

const styles = css`
  :host {
    position: fixed;
    display: flex;
    justify-content: center;
    left: 0;
    top: 0;
    right: 0;
    z-index: 80;
    height: 5rem;
    background: white;
    box-shadow: 0 0.25rem 1rem #DDD, 0 0.5rem 1rem #EEE, 0 0.75rem 1rem #FFF;
  }

`;

@customElement('kps-nav')
export default class Navigation extends LitElement {
  static styles = styles;

  button: Button | undefined = undefined;

  svgBurger = html`
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.48 11.5H3.52v1h16.96v-1ZM20.48 16.16H3.52v1h16.96v-1ZM20.48 6.84H3.52v1h16.96v-1Z"
        fill="currentColor"
      />
    </svg>
  `;

  svgClose = html`
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="m12.5 12.5 4.4 4.4.85-.85-4.4-4.4L17.9 7.1l-.85-.85-4.55 4.55-4.65-4.65L7 7l4.65 4.65-4.5 4.5L8 17l4.5-4.5Z"
        fill="currentColor"
      />
    </svg>
  `;

  render() {
    return html`
      <nav>
        <slot name="main-menu"></slot>
      </nav>
    `;
  }
}
