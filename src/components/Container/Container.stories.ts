import { html } from 'lit';
import './Container';
import '../../styles/main.css';
import '../../styles/fonts.css';

export default {
  title: 'Container',
  component: 'kps-container',
};

const InnerContent = html`
  <div style="display:flex;width:full;height:16rem;border:1px solid red;"></div>
`;

export const Default = () => html`
  <kps-container>
    ${InnerContent}
  </kps-container>
`;
