import { html } from 'lit';
import '../../styles/main.css';
import '../../styles/fonts.css';

export default {
  title: 'Strip',
  component: 'kps-strip',
};

export const Strip = () => html`
  <kps-container>
    <kps-strip color="secondary">
      <div slot="content">
        <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
        <a>Sign up now for more information</a>
      </div>
    </kps-strip>
  </kps-container>
`;
