import { html } from 'lit';
import '../../styles/main.css';
import '../../styles/fonts.css';

export default {
  title: 'Tab Group',
  component: 'kps-tab-group',
};

export const TabGroup = () => html`
  <kps-tab-group title="Test Tab Group">
    <kps-tab name="test-1" label="Test One">
      <kps-image-map
        image="//21683844.fs1.hubspotusercontent-na1.net/hubfs/21683844/raw_assets/public/NoahMedicalGalaxyTheme/assets/images/galaxy.png"
        .points="${[{ x: 24, y: 12, tag: 'This is a test' }, { x: 38, y: 49 }, { x: 60, y: 22 }, { x: 69, y: 65 }]}"
      >
      </kps-image-map>
    </kps-tab>
    <kps-tab name="test-2" label="Test Two">
      <kps-image-map
        image="//21683844.fs1.hubspotusercontent-na1.net/hubfs/21683844/raw_assets/public/NoahMedicalGalaxyTheme/assets/images/galaxy.png"
        .points="${[{ x: 12, y: 12, tag: 'This is a test' }, { x: 38, y: 49 }, { x: 60, y: 22 }, { x: 69, y: 65 }]}"
      >
      </kps-image-map>
    </kps-tab>
  </kps-tab-group>
`;
