import { html } from 'lit';
import './WorldMap';

export default {
  title: 'World Map',
  component: 'kps-world-map',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Main = () => html`
  <kps-world-map></kps-world-map>
`;
