// Create a sttory for the component
import { html } from 'lit';
import './HeroBanner';
import '../../styles/fonts.css';
import '../../styles/main.css';

export default {
  title: 'Hero Banner',
  component: 'kps-hero',
  parameters: {
    layout: 'fullscreen',
  },
};

const mobileImg = {
  src: 'https://21683844.fs1.hubspotusercontent-na1.net/hubfs/21683844/galaxy.png',
};

const logoImg = {
  src: 'https://21683844.fs1.hubspotusercontent-na1.net/hubfs/21683844/Logos/galaxy-logo.png',
};

const bgImg = {
  src: 'https://21683844.fs1.hubspotusercontent-na1.net/hubfs/21683844/NoahMed/Banners/galaxy-banner-purple.png',
};

export const Default = () => html`
  <div style="background:#1c0c35;">
    <kps-hero logoimg="${JSON.stringify(logoImg)}" bgimg="${JSON.stringify(bgImg)}" mobileImg="${JSON.stringify(mobileImg)}">
      <h1 slot="title" class="w-full md:w-1/2 text-[10rem] font-thin">Vision<span style="color:#B18FCF;">ary</span></h1>
      <h2 slot="subtitle" class="w-full md:w-1/2 text-4xl font-thin flex">TiLT+ Technology™ integration.<br>Real-time lesion updates.</h2>
      <p slot="tagline">THE <strong>GALAXY SYSTEM</strong> HAS ARRIVED</p>
      <kps-button slot="primary-cta" variant="outline" size="lg">Learn More</kps-button>
      <kps-button slot="secondary-cta" variant="outline" size="lg">Sign Up</kps-button>
    </kps-hero>
  </div>
`;
