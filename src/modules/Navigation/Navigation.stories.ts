import { html } from 'lit';
import './Navigation';
import '../../styles/main.css';
import logo from '../../assets/images/logo.svg';

export default {
  title: 'Navigation',
  component: 'kps-nav',
  parameters: {
    layout: 'fullscreen',
  },
};

const logoImg = {
  src: logo,
  alt: 'Logo',
};

export const Main = () => html`
  <header>
    <kps-nav .logoImg='${logoImg}'>
      <div slot="main-menu">
        <div id="hs_menu_wrapper_galaxy_header_" class="hs-menu-wrapper active-branch flyouts hs-menu-flow-horizontal" role="navigation" data-sitemap-name="default" data-menu-id="80537532068" aria-label="Navigation Menu">
          <ul role="menu">
            <li class="hs-menu-item hs-menu-depth-1 hs-item-has-children" role="none"><a href="javascript:;" aria-haspopup="true" aria-expanded="false" role="menuitem">Galaxy</a>
            <ul role="menu" class="hs-menu-children-wrapper">
              <li class="hs-menu-item hs-menu-depth-2 hs-item-has-children" role="none"><a href="javascript:;" role="menuitem">Main Menu Link</a>
              <ul role="menu" class="hs-menu-children-wrapper">
                <li class="hs-menu-item hs-menu-depth-3" role="none"><a href="//21683844.hs-sites.com/about" role="menuitem">Sub-menu Item</a></li>
                <li class="hs-menu-item hs-menu-depth-3" role="none"><a href="//21683844.hs-sites.com/about" role="menuitem">Sub-menu Item</a></li>
                <li class="hs-menu-item hs-menu-depth-3" role="none"><a href="//21683844.hs-sites.com/about" role="menuitem">Sub-menu Item</a></li>
                <li class="hs-menu-item hs-menu-depth-3" role="none"><a href="//21683844.hs-sites.com/about" role="menuitem">Sub-menu Item</a></li>
              </ul></li>
              <li class="hs-menu-item hs-menu-depth-2 hs-item-has-children" role="none"><a href="javascript:;" role="menuitem">Main Menu Link</a>
              <ul role="menu" class="hs-menu-children-wrapper">
                <li class="hs-menu-item hs-menu-depth-3" role="none"><a href="//21683844.hs-sites.com/about" role="menuitem">Sub-menu Item</a></li>
                <li class="hs-menu-item hs-menu-depth-3" role="none"><a href="//21683844.hs-sites.com/about" role="menuitem">Sub-menu Item</a></li>
                <li class="hs-menu-item hs-menu-depth-3" role="none"><a href="//21683844.hs-sites.com/about" role="menuitem">Sub-menu Item</a></li>
                <li class="hs-menu-item hs-menu-depth-3" role="none"><a href="//21683844.hs-sites.com/about" role="menuitem">Sub-menu Item</a></li>
              </ul></li>
              <li class="hs-menu-item hs-menu-depth-2 hs-item-has-children" role="none"><a href="javascript:;" role="menuitem">Main Menu Link</a>
              <ul role="menu" class="hs-menu-children-wrapper">
                <li class="hs-menu-item hs-menu-depth-3" role="none"><a href="//21683844.hs-sites.com/about" role="menuitem">Sub-menu Item</a></li>
                <li class="hs-menu-item hs-menu-depth-3" role="none"><a href="//21683844.hs-sites.com/about" role="menuitem">Sub-menu Item</a></li>
                <li class="hs-menu-item hs-menu-depth-3" role="none"><a href="//21683844.hs-sites.com/about" role="menuitem">Sub-menu Item</a></li>
                <li class="hs-menu-item hs-menu-depth-3" role="none"><a href="//21683844.hs-sites.com/about" role="menuitem">Sub-menu Item</a></li>
              </ul></li>
            </ul></li>
            <li class="hs-menu-item hs-menu-depth-1" role="none"><a href="//21683844.hs-sites.com/about" role="menuitem">Events</a></li>
            <li class="hs-menu-item hs-menu-depth-1" role="none"><a href="//21683844.hs-sites.com/about" role="menuitem">News</a></li>
            <li class="hs-menu-item hs-menu-depth-1" role="none"><a href="//21683844.hs-sites.com/about" role="menuitem">About</a></li>
            <li class="hs-menu-item hs-menu-depth-1" role="none"><a href="//21683844.hs-sites.com/about" role="menuitem">Contact</a></li>
          </ul>
        </div>
      </div>

      <span slot="main-cta" color="primary" cta round uppercase>
      </span>
    </kps-nav>
  </header>
  <div style="height:100vh;width:100$;background:black;">
  </div>
`;
