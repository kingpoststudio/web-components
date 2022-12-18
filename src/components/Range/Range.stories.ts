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
  <kps-range min="1" max="7" id="min-max" defaultmin="4"></kps-range>
  <br/>
  <kps-range type="pm" min="1" max="7" id="plus-minus" defaultmin="3" tolerance="2"></kps-range>
`;
