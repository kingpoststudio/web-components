import { html } from 'lit';
import './Search';

export default {
  title: 'Search',
  component: 'kps-search',
  parameters: {
    layout: 'fullscreen',
  },
};

const mockSettings = {
  columnId: 'search_terms',
  tableId: 'chromatography_documents',
  portalId: '22628452',
};

export const Main = () => html`
  <kps-search typeahead=true .settings=${mockSettings}></kps-search>
`;
