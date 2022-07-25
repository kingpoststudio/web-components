import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import './Navigation.css';

const styles = css`
  :host {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
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

  protected render() {
    return html`
      <nav>
        <slot name="main-menu"></slot>
      </nav>
    `;
  }
}
