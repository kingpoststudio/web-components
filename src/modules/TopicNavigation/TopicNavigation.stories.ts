import { html } from 'lit';
import './TopicNavigation';

export default {
  title: 'Topic Navigation',
  component: 'kps-topic-navigation',
  parameters: {
    layout: 'fullscreen',
  },
};

const mockTopics = [
  {
    id: 'topic-1',
    label: 'Topic 1',
  },
  {
    id: 'topic-2',
    label: 'Topic 2',
  },
];

export const Main = () => html`
  <kps-topic-navigation .topics=${mockTopics}></kps-topic-navigation>
`;
