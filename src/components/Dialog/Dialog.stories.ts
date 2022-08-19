import { html } from 'lit';
import '../../styles/main.css';
import '../../styles/fonts.css';
import '../../index';

export default {
  title: 'Dialog',
  component: 'kps-dialog',
};

export const Dialog = () => html`
  <kps-nav>
    <kps-dialog variant="dropdown" theme="dark" slot="main-cta">
      <span slot="trigger">Request Product Info</span>
      <div class="content" slot="content">
        Test!
      </div>
    </kps-dialog>
  </kps-nav>
`;
