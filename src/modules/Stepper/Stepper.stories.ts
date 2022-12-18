import { html } from 'lit';
import './Stepper';
import '../../styles/main.css';

export default {
  title: 'Stepper',
  component: 'kps-stepper',
  parameters: {
    layout: 'fullscreen',
  },
};

const images = [
  { src: 'https://21262706.fs1.hubspotusercontent-na1.net/hubfs/21262706/site%20images/tool-in-legion-scroll/Noah_Tool-in-Lesion_Scroll_10.jpg' },
  { src: 'https://21262706.fs1.hubspotusercontent-na1.net/hubfs/21262706/site%20images/tool-in-legion-scroll/Noah_Tool-in-Lesion_Scroll_9.jpg' },
  { src: 'https://21262706.fs1.hubspotusercontent-na1.net/hubfs/21262706/site%20images/tool-in-legion-scroll/Noah_Tool-in-Lesion_Scroll_8.jpg' },
  { src: 'https://21262706.fs1.hubspotusercontent-na1.net/hubfs/21262706/site%20images/tool-in-legion-scroll/Noah_Tool-in-Lesion_Scroll_7.jpg' },
  { src: 'https://21262706.fs1.hubspotusercontent-na1.net/hubfs/21262706/site%20images/tool-in-legion-scroll/Noah_Tool-in-Lesion_Scroll_6.jpg' },
  { src: 'https://21262706.fs1.hubspotusercontent-na1.net/hubfs/21262706/site%20images/tool-in-legion-scroll/Noah_Tool-in-Lesion_Scroll_5.jpg' },
  { src: 'https://21262706.fs1.hubspotusercontent-na1.net/hubfs/21262706/site%20images/tool-in-legion-scroll/Noah_Tool-in-Lesion_Scroll_4.jpg' },
  { src: 'https://21262706.fs1.hubspotusercontent-na1.net/hubfs/21262706/site%20images/tool-in-legion-scroll/Noah_Tool-in-Lesion_Scroll_3.jpg' },
  { src: 'https://21262706.fs1.hubspotusercontent-na1.net/hubfs/21262706/site%20images/tool-in-legion-scroll/Noah_Tool-in-Lesion_Scroll_2.jpg' },
  { src: 'https://21262706.fs1.hubspotusercontent-na1.net/hubfs/21262706/site%20images/tool-in-legion-scroll/Noah_Tool-in-Lesion_Scroll_1.jpg' },
].reverse();

const blocks = [
  { text: '<p style="font-size:3rem;font-weight:thin;color:#353535;">Lorem ipsum dolor sit amet.</p>', position: { x: 10, y: 10, mobile: { x: 0, y: 0 } }, slides: { from: 0, to: 3 } },
  { text: '<p style="font-size:2rem;font-weight:thin;color:#353535;">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>', position: { x: 30, y: 40 }, slides: { from: 4, to: 10 } },
  { text: '<p style="font-size:2rem;font-weight:thin;color:#353535;">Nice.</p>', position: { x: 70, y: 70 }, slides: { from: 8, to: 10 } },
];

export const Main = () => html`
  <style>
    .content {
      display: flex;
      height: 100vh;
      background: #CCC;
    }
  </style>
  <div>
    <kps-nav style="background:white;"></kps-nav>
    <div class="content"></div>
    <kps-stepper speed="fast" .images=${images} .blocks=${blocks}></kps-stepper>
    <div class="content"></div>
  </div>
`;
