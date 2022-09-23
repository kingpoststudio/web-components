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
    imageSize="cover"
    .points="${[
    {
      x: 50, y: 50, tag: 'This is a test, bucko.', position: 'bottom',
    },
    {
      x: 5, y: 100, tag: 'This is a test, an extended test, intended to extend the test much longer than previously extended.', position: 'left',
    },
  ]}"
  >
  </kps-image-map>
`;
