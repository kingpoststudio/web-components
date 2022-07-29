import { html } from 'lit';
import './Navigation';
import './Navigation.css';
import logo from '../../assets/images/logo.svg';
import '../../styles/main.css';

export default {
  title: 'Navigation',
  component: 'kps-nav',
};

const logoImg = {
  src: logo,
  alt: 'Logo',
};

export const Main = () => html`
  <header>
    <kps-nav .logoImg='${logoImg}'>
      <span slot="main-menu" class="main-menu">
      </span>
      <span slot="main-cta" color="primary" cta round uppercase>
      </span>
    </kps-nav>
  </header>
`;
