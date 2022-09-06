import { html } from 'lit';
import '../../styles/main.css';
import '../../styles/fonts.css';

export default {
  title: 'Button',
  component: 'kps-button',
};

export const Colors = () => html`
  <kps-button-group direction="row">
    <kps-button size="icon" variant="outline"><kps-icon icon="linkedin"></kps-icon></kps-button>
    <kps-button size="icon" variant="outline"><kps-icon icon="twitter"></kps-icon></kps-button>
    <kps-button size="icon" variant="outline"><kps-icon icon="youtube"></kps-icon></kps-button>
    <kps-button size="icon" variant="outline"><kps-icon icon="instagram"></kps-icon></kps-button>
  </kps-button-group>
`;
