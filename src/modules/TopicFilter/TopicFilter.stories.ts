import { html } from 'lit';
import './TopicFilter';

export default {
  title: 'Topic Filter',
  component: 'kps-topic-filter',
  parameters: {
    layout: 'fullscreen',
  },
};

const mockTopics = [
  {
    name: 'Topic 1',
    id: 'topic-1',
    options: [
      {
        id: '1',
        name: 'Option 1',
      },
      {
        id: '2',
        name: 'Option 2',
      },
      {
        id: '3',
        name: 'Option 3',
      },
    ],
  },
  {
    name: 'Topic 2',
    id: 'topic-2',
    options: [
      {
        id: '1',
        name: 'Option 1',
      },
      {
        id: '2',
        name: 'Option 2',
      },
      {
        id: '3',
        name: 'Option 3',
      },
    ],
  },
];

export const Main = () => html`
  <kps-topic-filter .topics=${mockTopics}></kps-topic-filter>
`;
