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
    .points="${[{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }]}"
  >
  </kps-image-map>
`;
