import { html } from 'lit';

export default {
  title: 'Fade',
  component: 'kps-fade',
};

export const Dropdown = () => html`
  <div style="padding-block:150vh;">
    <kps-fade>
      <kps-container style="padding-block:8rem;background:#DEDEDE">
        <h1>Big test.</h1>
      </kps-container>
    </kps-fade>
  </div>
`;
