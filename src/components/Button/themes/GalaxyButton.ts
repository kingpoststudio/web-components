import { css } from 'lit';
import { customElement } from 'lit/decorators.js';
import Button from '../Button';

const styles = css`
  .wrap > a {
    padding-inline: 4rem;
  }
`;

@customElement('galaxy-button')
export default class GalaxyButton extends Button {
  static styles = [Button.styles, styles];
}
