import { html } from 'lit';
import './Scroller';
import '../../styles/main.css';

export default {
  title: 'Scroller',
  component: 'kps-scroller',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Main = () => html`
  <div>
    <div style="height: 50vh; background: red; display: flex; align-items: center; justify-content: center;"></div>
    <kps-scroller>
      <div>This is some text.</div>
      <div>Can you believe it?</div>
      <div>One more time.</div>
      <div>Taco Bell.</div>
    </kps-scroller>
    <div style="height: 50vh; background: red; display: flex; align-items: center; justify-content: center;"></div>
  </div>
`;
