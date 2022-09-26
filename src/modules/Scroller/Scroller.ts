import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const styles = css`
  .wrap {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #CCC;
    overflow-y: scroll;
  }

  .section {
    flex: none;
    width: 100%;
    height: 100vh;
    background: blue;
  }

  .section:nth-child(2n) {
    background: purple;
  }

  .section:nth-child(3n) {
    background: cyan;
  }

  .section:nth-child(4n) {
    background: green;
  }
`;

@customElement('kps-scroller')
export default class Scroller extends LitElement {
  static styles = styles;


  render() {
    return html`
      <div class="wrap">
        <div class="section"></div>
        <div class="section"></div>
        <div class="section"></div>
        <div class="section"></div>
      </div>
    `;
  }
}
