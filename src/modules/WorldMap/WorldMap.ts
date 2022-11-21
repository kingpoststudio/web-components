import { html, unsafeCSS, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Styles from './WorldMap.css';

@customElement('kps-world-map')
export default class WorldMap extends LitElement {
  static styles = [unsafeCSS(Styles)];

  render() {
    return html`
      <div class="wrap">
        <div class="tabs">

        </div>
        <div class="map">
        </div>
      </div>
    `;
  }
}
