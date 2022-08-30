import { html } from 'lit';
import '../../styles/main.css';
import '../../styles/fonts.css';

export default {
  title: 'Tab Group',
  component: 'kps-tab-group',
};

export const TabGroup = () => html`
  <kps-tab-group>
    <kps-tab href="#" active>Articles</kps-tab>
    <kps-tab>Social media</kps-tab>
    <kps-tab>Press releases</kps-tab>
  </kps-tab-group>
`;
