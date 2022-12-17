import { html } from 'lit';
import '../../styles/main.css';
import '../../styles/fonts.css';

export default {
  title: 'Range',
  component: 'kps-range',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Main = () => html`
  <kps-range min="1" max="7" id="megarange" defaultmin="4">
  </kps-range>
`;
