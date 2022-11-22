import { html } from 'lit';
import './WorldMap';

export default {
  title: 'World Map',
  component: 'kps-world-map',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Main = () => html`
  <kps-container>
    <kps-world-map>
      <div slot="helixrus">
        Testing this.
      </div>
      <div slot="tgia">
        Testing this, too.
      </div>
    </kps-world-map>
  </kps-container>
`;
