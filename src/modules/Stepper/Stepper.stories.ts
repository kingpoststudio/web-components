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

const steps = [
  { title: 'Foo', image: 'https://21262706.fs1.hubspotusercontent-na1.net/hubfs/21262706/site%20images/tool-in-legion-scroll/Noah_Tool-in-Lesion_Scroll_10.jpg' },
  { title: 'Foo', image: 'https://21262706.fs1.hubspotusercontent-na1.net/hubfs/21262706/site%20images/tool-in-legion-scroll/Noah_Tool-in-Lesion_Scroll_9.jpg' },
  { title: 'Foo', image: 'https://21262706.fs1.hubspotusercontent-na1.net/hubfs/21262706/site%20images/tool-in-legion-scroll/Noah_Tool-in-Lesion_Scroll_8.jpg' },
  { title: 'Foo', image: 'https://21262706.fs1.hubspotusercontent-na1.net/hubfs/21262706/site%20images/tool-in-legion-scroll/Noah_Tool-in-Lesion_Scroll_7.jpg' },
  { title: 'Foo', image: 'https://21262706.fs1.hubspotusercontent-na1.net/hubfs/21262706/site%20images/tool-in-legion-scroll/Noah_Tool-in-Lesion_Scroll_6.jpg' },
  { title: 'Foo', image: 'https://21262706.fs1.hubspotusercontent-na1.net/hubfs/21262706/site%20images/tool-in-legion-scroll/Noah_Tool-in-Lesion_Scroll_5.jpg' },
  { title: 'Foo', image: 'https://21262706.fs1.hubspotusercontent-na1.net/hubfs/21262706/site%20images/tool-in-legion-scroll/Noah_Tool-in-Lesion_Scroll_4.jpg' },
  { title: 'Foo', image: 'https://21262706.fs1.hubspotusercontent-na1.net/hubfs/21262706/site%20images/tool-in-legion-scroll/Noah_Tool-in-Lesion_Scroll_3.jpg' },
  { title: 'Foo', image: 'https://21262706.fs1.hubspotusercontent-na1.net/hubfs/21262706/site%20images/tool-in-legion-scroll/Noah_Tool-in-Lesion_Scroll_2.jpg' },
  { title: 'Foo', image: 'https://21262706.fs1.hubspotusercontent-na1.net/hubfs/21262706/site%20images/tool-in-legion-scroll/Noah_Tool-in-Lesion_Scroll_1.jpg' },
];

export const Main = () => html`
  <div>
    <kps-nav style="background:white;"></kps-nav>
    <div style="width:100vw;height:100vh;overflow:hidden;background:blue;"></div>
    <kps-stepper .steps=${steps}>
    </kps-stepper>
    <div style="width:100vw;height:100vh;overflow:hidden;background:blue;"></div>
  </div>
`;
