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
    .points="${[{ x: 24, y: 12, tag: 'This is a test' }, { x: 38, y: 49, tag: 'This is a test slightly longer than the usual' }, { x: 60, y: 22, tag: 'This is a test' }, { x: 69, y: 65, tag: 'This is a test' }]}"
  >
  </kps-image-map>
`;
