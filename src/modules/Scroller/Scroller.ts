import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';

const styles = css`
  :host {
    position: sticky;
    top: 0;
  }

  .wrap {
    display: flex;
    flex-direction: column;
    height: 40vh;
    background: #CCC;
  }

  .wrap::-webkit-scrollbar {
    display: none;
  }

  ::slotted(*) {
    position: sticky;
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40vh;
    border: 2px solid red;
    box-sizing: border-box;
  }
`;

@customElement('kps-scroller')
export default class Scroller extends LitElement {
  static styles = styles;

  wrapRef = createRef<HTMLDivElement>();

  render() {
    return html`
      <div class="wrap" ${ref(this.wrapRef)}>
        <slot></slot>
      </div>
    `;
  }
}
