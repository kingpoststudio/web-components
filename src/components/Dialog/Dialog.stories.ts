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
    <kps-dialog>
      <kps-button slot="trigger">
        Open Dialog
      </kps-button>
      <span slot="content">Dialog Content</span>
    </kps-dialog>
  </div>
`;
