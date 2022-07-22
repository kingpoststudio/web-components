import { html } from 'lit';
import './Button';

export default {
  title: 'Button',
  component: 'kps-button',
};

export const PrimaryButton = () => html`
  <kps-button primary>Primary</kps-button>
`;
