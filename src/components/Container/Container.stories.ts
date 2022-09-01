import { html } from 'lit';
import './Container';
import '../../styles/main.css';
import '../../styles/fonts.css';

export default {
  title: 'Container',
  component: 'kps-container',
};

export const Container = () => html`
  <kps-container>
    <div style="width:fit-content;position:relative;">
      <img src="https://21683844.fs1.hubspotusercontent-na1.net/hubfs/21683844/raw_assets/public/NoahMedicalGalaxyTheme/assets/images/galaxy.png">
      <div style="width:2rem;height:2rem;background:red;top:10%;left:22%;position:absolute;"></div>
      <div style="width:2rem;height:2rem;background:blue;top:49%;left:38%;position:absolute;"></div>
      <div style="width:2rem;height:2rem;background:green;top:22%;left:60%;position:absolute;"></div>
      <div style="width:2rem;height:2rem;background:yellow;top:65%;left:70%;position:absolute;"></div>
    </div>
  </kps-container>
`;
