import { html } from 'lit';
import './Scroller';
import '../../styles/main.css';

export default {
  title: 'Scroller',
  component: 'kps-scroller',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Main = () => html`
  <kps-scroller></kps-scroller>
`;
