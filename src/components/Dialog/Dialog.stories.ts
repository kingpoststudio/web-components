import { html } from 'lit';
import '../../styles/main.css';
import '../../styles/fonts.css';
import '../../index';

export default {
  title: 'Dialog',
  component: 'kps-dialog',
};

export const Dialog = () => html`
  <div>
    <kps-dialog variant="dropdown" theme="dark">
      <kps-button slot="trigger">Open Dialog</kps-button>
      <h3 slot="title" style="margin:0;">Dialog Title</h3>
      <span slot="content">Dialog Content</span>
    </kps-dialog>
  </div>
`;
