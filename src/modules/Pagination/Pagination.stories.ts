import { html } from 'lit';
import './Pagination';

export default {
  title: 'Pagination',
  component: 'kps-pagination',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Main = () => html`
  <kps-pagination></kps-pagination>
`;
