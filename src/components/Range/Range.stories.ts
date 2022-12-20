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
  <kps-range type="pm" min="0" max="10" id="plus-minus" defaultmin="3.5" defaultmax="4.5" tolerance="0.5"></kps-range>
`;
