import { html } from 'lit';
import './Button';
import '../../styles/main.css';

export default {
  title: 'Button',
  component: 'kps-button',
};

export const Colors = () => html`
  <div>
    <kps-button color="primary">Primary</kps-button>
    <kps-button color="secondary">Secondary</kps-button>
    <kps-button color="success">Success</kps-button>
    <kps-button color="warning">Warning</kps-button>
    <kps-button color="error">Error</kps-button>
  </div>
`;
