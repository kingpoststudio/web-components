import { html } from 'lit';
import './TopicFilter';

export default {
  title: 'Topic Filter',
  component: 'kps-topic-filter',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Main = () => html`
  <kps-topic-filter></kps-topic-filter>
`;
