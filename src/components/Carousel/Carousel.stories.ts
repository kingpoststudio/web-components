import { html } from 'lit';
import '../../styles/main.css';
import '../../styles/fonts.css';

export default {
  title: 'Carousel',
  component: 'kps-carousel',
};

export const Default = () => html`
  <kps-carousel>
    <div>Test 1</div>
    <div>Test 2</div>
    <div>Test 3</div>
  </kps-carousel>
`;
