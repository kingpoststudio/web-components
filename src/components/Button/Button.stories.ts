import { html } from 'lit';
import '../../styles/main.css';
import '../../styles/fonts.css';

export default {
  title: 'Button',
  component: 'kps-button',
};

export const Colors = () => html`
  <kps-button color="primary">Primary</kps-button>
  <kps-button color="secondary">Secondary</kps-button>
  <kps-button color="success">Success</kps-button>
  <kps-button color="warning">Warning</kps-button>
  <kps-button color="error">Danger</kps-button>
  <kps-button color="transparent">Info</kps-button>
`;

export const Icons = () => html`
  <kps-button-group direction="row">
    <kps-button size="icon" variant="outline"><kps-icon icon="linkedin"></kps-icon></kps-button>
    <kps-button size="icon" variant="outline"><kps-icon icon="twitter"></kps-icon></kps-button>
    <kps-button size="icon" variant="outline"><kps-icon icon="youtube"></kps-icon></kps-button>
    <kps-button size="icon" variant="outline"><kps-icon icon="instagram"></kps-icon></kps-button>
  </kps-button-group>
`;
