import { html } from 'lit';
import '../../styles/main.css';
import '../../styles/fonts.css';

export default {
  title: 'Image Map',
  component: 'kps-image-map',
};

export const ImageMap = () => html`
  <kps-image-map
    image="//21683844.fs1.hubspotusercontent-na1.net/hubfs/21683844/raw_assets/public/NoahMedicalGalaxyTheme/assets/images/galaxy.png"
    .points="${[{ x: 80, y: 12, tag: 'This is a test' }, { x: 80, y: 49, tag: 'This is a test slightly longer than the usual' }, { x: 80, y: 22, tag: 'This is a test' }, { x: 80, y: 65, tag: 'This is a test, an extended test, intended to extend the test much longer than previously extended.' }]}"
  >
  </kps-image-map>
`;
