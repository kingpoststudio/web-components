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
    .points="${[
    { x: 65, y: 12, tag: 'This is a test, an extended test, intended to extend the test much longer than previously extended.' },
    { x: 70, y: 49, tag: 'This is a test slightly longer than the usual' },
    { x: 0, y: 0, tag: 'This is a test, an extended test, intended to extend the test much longer than previously extended.' },
    { x: 100, y: 100, tag: 'This is a test, its longer, I think it looks cool' },
    { x: 50, y: 50, tag: 'This is a test' },
    { x: 20, y: 20, tag: 'This is a test' },
    { x: 80, y: 65, tag: 'This is a test, an extended test, intended to extend the test much longer than previously extended.' },
  ]}"
  >
  </kps-image-map>
`;
