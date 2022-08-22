import { html } from 'lit';
import '../../styles/main.css';
import '../../styles/fonts.css';

export default {
  title: 'ButtonGroup',
  component: 'kps-button-group',
};

export const Column = () => html`
  <kps-button-group direction="column">
    <kps-button color="success">Confirm</kps-button>
    <kps-button color="warning">Edit</kps-button>
    <kps-button color="error">Cancel</kps-button>
  </kps-button-group>
`;

export const Row = () => html`
  <kps-button-group direction="row">
    <kps-button color="success">Confirm</kps-button>
    <kps-button color="warning">Edit</kps-button>
    <kps-button color="error">Cancel</kps-button>
  </kps-button-group>
`;
