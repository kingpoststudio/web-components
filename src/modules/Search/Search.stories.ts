import { html } from 'lit';
import './Search';

export default {
  title: 'Search',
  component: 'kps-search',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Main = () => html`
  <kps-search typeahead=true></kps-search>
`;
