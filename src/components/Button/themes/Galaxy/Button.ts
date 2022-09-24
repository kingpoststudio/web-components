import { css } from 'lit';
import { customElement } from 'lit/decorators.js';
import Button from '../../Button';

const GalaxyStyles = css`
  .wrap > a:hover {
    background: var(--color-secondary-darkest);
  }
`;

@customElement('galaxy-button')
export default class GalaxyButton extends Button {
  static get styles() {
    return [super.styles, GalaxyStyles];
  }
}
