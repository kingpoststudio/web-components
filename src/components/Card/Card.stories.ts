import { html } from 'lit';
import './Card';
import '../../styles/main.css';
import '../../styles/fonts.css';

export default {
  title: 'Card',
  component: 'kps-card',
};

// get time from three days ago in mm/dd/yyyy format //
const date = new Date();
date.setDate(date.getDate() - 3);
const formattedDate = date.toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export const Card = () => html`
  <kps-container>
    <kps-grid flex>
      <kps-card variant="post" color="secondary" rounded>
        <p slot="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.</p>
        <p slot="author">Lorem Ipsum</p>
        <p slot="handle">@loremipsum</p>
        <kps-datetime slot="date" datetime="${formattedDate}" variant="days-ago"></kps-datetime>
      </kps-card>
    </kps-grid>
  </kps-container>
`;
