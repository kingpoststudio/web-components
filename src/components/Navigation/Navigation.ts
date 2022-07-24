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


  .center {
    width: 100%;
    display: flex;
    align-items: center;
    max-width: var(--page-max-width-wide);
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 var(--space-md);
  }

  .actions {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .logo {
    color: var(--color-charcoal);
    position: relative;
    z-index: 1;
  }

  .logo svg {
    width: calc(var(--scale) * 8.4);
    height: auto;
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

  firstUpdated() {
    console.log('Updated.');
  }

  static render() {
    return html`
      <div class="center">
        <nav class="nav">
          <slot name="main-menu"></slot>
        </nav>
        <a href="/" class="logo as-link">
        </a>
        <div class="actions">
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }
}
