import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';

const styles = css`
  :host {
    position: sticky;
    top: 0;
  }

  .wrap {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #CCC;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
  }

  .wrap::-webkit-scrollbar {
    display: none;
  }

  ::slotted(*) {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    border: 2px solid red;
    box-sizing: border-box;
    scroll-snap-align: start;
  }
`;

@customElement('kps-scroller')
export default class Scroller extends LitElement {
  static styles = styles;

  wrapRef = createRef<HTMLDivElement>();

  firstUpdated() {
    const wrap = this.wrapRef.value;
    window.addEventListener('scroll', () => {
      const topPos = wrap?.getBoundingClientRect().top;
      if (topPos && topPos <= 0) {
        
      }
    });
  }

  render() {
    return html`
      <div class="wrap" ${ref(this.wrapRef)}>
        <slot></slot>
      </div>
    `;
  }
}
