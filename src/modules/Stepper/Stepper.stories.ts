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
  { text: 'Lorem ipsum dolor sit amet.', position: { x: 10, y: 10 }, slides: { from: 0, to: 3 } },
  { text: '<h1>This is a test, please be considerate.</h1>', position: { x: 30, y: 60 }, slides: { from: 4, to: 10 } },
];

export const Main = () => html`
  <div>
    <kps-nav style="background:white;"></kps-nav>
    <div style="width:100vw;height:100vh;overflow:hidden;background:blue;"></div>
    <kps-stepper .images=${images} .blocks=${blocks}></kps-stepper>
    <div style="width:100vw;height:100vh;overflow:hidden;background:blue;"></div>
  </div>
`;
