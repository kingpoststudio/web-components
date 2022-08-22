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
    <kps-grid flex cols="2">
      <kps-card></kps-card>
      <kps-card></kps-card>
      <kps-card></kps-card>
    </kps-grid>
  </kps-container>
`;
