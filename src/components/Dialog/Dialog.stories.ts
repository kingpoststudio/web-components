import { html } from 'lit';
import './Dialog';
import '../../styles/main.css';
import '../../styles/fonts.css';

export default {
  title: 'Dialog',
  component: 'kps-dialog',
};

export const Dialog = () => html`
  <div>
    <kps-dialog>
      <span slot="trigger">Open Dialog</span>
      <span slot="content">Dialog Content</span>
    </kps-dialog>
  </div>
`;
