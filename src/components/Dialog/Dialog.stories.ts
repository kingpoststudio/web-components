import { html } from 'lit';
import '../../styles/main.css';
import '../../styles/fonts.css';
import '../../index';

export default {
  title: 'Dialog',
  component: 'kps-dialog',
};

export const Dialog = () => html`
  <kps-dialog slot="cta" button="false">
    <span slot="trigger">
      <div style="aspect-ratio: 4/3; background: red;">
        Testing!
      </div>
    </span>
    <div class="content" slot="content">
      Your content goes here.
    </div>
  </kps-dialog>
`;
