import { html } from 'lit';
import './DateFilter';

export default {
  title: 'Date Filter',
  component: 'kps-date-filter',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Main = () => html`
  <kps-date-filter></kps-date-filter>
`;
