import { html } from 'lit';
import '../../styles/main.css';
import '../../styles/fonts.css';

export default {
  title: 'Carousel',
  component: 'kps-carousel',
};

export const Default = () => html`
  <kps-carousel>
    <kps-slide style="width:100%;">
      <h1 slot="title">{{ slide.title }}</h1>
      <p slot="description">{{ slide.description|truncate(140) }}</p>
      <kps-button color="secondary" slot="action" href="{{ content.absolute_url }}">
        <span style="color:white;">{{ slide.action_label || 'Read more' }}</span>
      </kps-button>
    </kps-slide>
    <kps-slide style="width:100%;">
      <h1 slot="title">{{ slide.title }}</h1>
      <p slot="description">{{ slide.description|truncate(140) }}</p>
      <kps-button color="secondary" slot="action" href="{{ content.absolute_url }}">
        <span style="color:white;">{{ slide.action_label || 'Read more' }}</span>
      </kps-button>
    </kps-slide>
    <kps-slide style="width:100%;">
      <h1 slot="title">{{ slide.title }}</h1>
      <p slot="description">{{ slide.description|truncate(140) }}</p>
      <kps-button color="secondary" slot="action" href="{{ content.absolute_url }}">
        <span style="color:white;">{{ slide.action_label || 'Read more' }}</span>
      </kps-button>
    </kps-slide>
  </kps-carousel>
`;
