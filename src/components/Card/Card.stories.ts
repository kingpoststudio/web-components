import { html } from 'lit';
import './Card';
import '../../styles/main.css';
import '../../styles/fonts.css';

export default {
  title: 'Card',
  component: 'kps-card',
};

export const Card = () => html`
  <kps-container>
    <kps-grid flex>
      <kps-card></kps-card>
      <kps-card></kps-card>
      <kps-card></kps-card>
    </kps-grid>

    <kps-grid flex>
      <kps-card variant="quote"  color="secondary" theme="dark" round>
        <h1 slot="quote">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h1>
        <span slot="author">- John Doe</span>
      </kps-card>
      <kps-card variant="quote" color="secondary" theme="dark"></kps-card>
      <kps-card variant="quote"></kps-card>
    </kps-grid>
  </kps-container>
`;
