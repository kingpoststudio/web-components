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
    <kps-dialog slot="cta">
      <span slot="trigger">Request Product Info</span>
      <div class="content" slot="content">
        Your content goes here.
      </div>
    </kps-dialog>
  </kps-nav>
`;
