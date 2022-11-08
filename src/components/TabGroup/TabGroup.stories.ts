import { html } from 'lit';
import '../../styles/main.css';
import '../../styles/fonts.css';

export default {
  title: 'Tab Group',
  component: 'kps-tab-group',
};

export const TabGroup = () => html`
  <kps-tab-group>
    <h2 slot="title">The Galaxy Cart</h2>
    <p slot="subtitle">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id</p>
 
    <kps-tab name="test-1" label="Test One">
      <kps-image-map
        image="https://21683844.fs1.hubspotusercontent-na1.net/hubfs/21683844/galaxy.png"
        .points="${[
    {
      x: 80, y: 80, tag: 'This is a test, yes, yes it really is.', href: '#test-2',
    },
    { x: 38, y: 49 }, { x: 60, y: 22 }, { x: 69, y: 65 },
  ]}"
      >
      </kps-image-map>
    </kps-tab>
    <kps-tab name="test-2" label="Test Two">
      <kps-image-map
        image="https://21683844.fs1.hubspotusercontent-na1.net/hubfs/21683844/robot-arm.png"
        .points="${[{ x: 12, y: 12, tag: 'This is a test' }, { x: 38, y: 49 }, { x: 60, y: 22 }, { x: 69, y: 65 }]}"
      >
      </kps-image-map>
    </kps-tab>
    <kps-tab name="test-3" label="Test Three">
      <kps-image-map
        image="https://21683844.fs1.hubspotusercontent-na1.net/hubfs/21683844/robot-arm.png"
        .points="${[{ x: 12, y: 12, tag: 'This is a test' }, { x: 38, y: 49 }, { x: 60, y: 22 }, { x: 69, y: 65 }]}"
      >
      </kps-image-map>
    </kps-tab>
  </kps-tab-group>
`;
