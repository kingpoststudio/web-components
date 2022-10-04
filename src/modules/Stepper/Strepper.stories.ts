import { html } from 'lit';
import './Stepper';
import '../../styles/main.css';

export default {
  title: 'Stepper',
  component: 'kps-stepper',
  parameters: {
    layout: 'fullscreen',
  },
};

const steps = [
  { title: 'Foo', image: 'https://picsum.photos/id/351/640/400' },
  { title: 'Bar', image: 'https://picsum.photos/id/352/640/400' },
  { title: 'Baz', image: 'https://picsum.photos/id/353/640/400' },
  { title: 'Qux', image: 'https://picsum.photos/id/354/640/400' },
];

export const Main = () => html`
  <div>
    <div style="height: 100vh; overflow: hidden;"></div>
    <kps-stepper .steps=${steps}>
    </kps-stepper>
    <div style="height: 100vh; overflow: hidden;"></div>
  </div>
`;
