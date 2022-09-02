import { html } from 'lit';
import '../../styles/main.css';
import '../../styles/fonts.css';

export default {
  title: 'Select',
  component: 'kps-select',
};

export const Select = () => html`
  <kps-select variant="nav">
    <option value="#articles" selected>Articles</option>
    <option value="#sm">Social media</option>
    <option value="#pr">Press releases</option>
  </kps-select>
`;
