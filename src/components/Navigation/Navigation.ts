import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Button from '../Button/Button';

const LAYOUT_SWITCH_AT = 640;

const styles = css`
  :host {
    position: fixed;
    display: flex;
    justify-content: center;
    left: 0;
    top: 0;
    right: 0;
    z-index: 80;
    height: calc(var(--scale) * 4.8);
    background-color: transparent;
    box-shadow: 0 0 0 1px transparent;
    transition: box-shadow calc(var(--ease-time) * 2) var(--ease-type);
    transition-property: box-shadow, background-color;
  }

  :host([data-sticky="true"]) {
    background-color: var(--color-cream);
    box-shadow: var(--light-shadow);
    transition: box-shadow calc(var(--ease-time) * 2) var(--ease-type);
  }

  .center {
    width: 100%;
    display: flex;
    align-items: center;
    max-width: var(--page-max-width-wide);
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 var(--space-md);
  }

  .actions {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  ::slotted([slot="actions"]) {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .logo {
    color: var(--color-charcoal);
    position: relative;
    z-index: 1;
  }

  .logo svg {
    width: calc(var(--scale) * 8.4);
    height: auto;
  }

  .domain {
    display: none;
  }
  .help {
    display: none;
    justify-content: flex-end;
  }

  .center[variant="landingpage"] .mob,
  .center[variant="landingpage"] .m-toggle,
  .center[variant="landingpage"] .nav {
    display: none;
  }

  .center[variant="landingpage"] .domain,
  .center[variant="landingpage"] .help {
    display: flex;
    flex: 1;
    font-weight: 500;
  }

  .center[variant="landingpage"] .actions {
    display: none;
  }

  @media screen and (max-width: ${764 - 1}px) {
    .nav {
      position: absolute;
      left: 0;
      right: 0;
      top: 45vh;
      z-index: 100;
      transform: translateY(-50%);
    }

    .m-toggle {
      flex: 1;
      position: relative;
      z-index: 1;
    }

    .m-toggle button {
      padding: 0.6em 1em;
      margin: -0.6em 0 -0.6em -1em;
      background: none;
      border: none;
    }

    .mob {
      position: absolute;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
    }

    .actions {
      position: absolute;
      top: 100vh;
      transform: translateY(-100%);
      padding-bottom: var(--space-md);
      left: 0;
      right: 0;
    }

    .center[open="true"] ::slotted([slot="actions"]) {
      flex-direction: column;
      justify-content: center;
      grid-gap: var(--space-sm);
      width: 100%;
    }

    .center .mob,
    .center .actions,
    .center .nav {
      opacity: 1;
      transition: opacity var(--ease-time) var(--ease-type);
    }

    .center[open="false"] .mob,
    .center[open="false"] .nav {
      opacity: 0;
      pointer-events: none;
    }

    .center[open="false"] .actions {
      position: relative;
      top: 0;
      opacity: 1;
      transform: translateY(0);
      font-size: 0.9em;
      --scale: 0.9em;
      margin-left: var(--space-md);
      padding-bottom: 0;
    }

    .center[open="false"] .logo {
      margin-left: 0.5em;
    }

    .center[open="true"] .actions-ph {
      flex: 1;
    }

    .center[variant="landingpage"] .domain {
      opacity: 0;
      width: 0;
      pointer-events: none;
    }
  }

  @media screen and (min-width: ${650}px) {
    .nav {
      display: block;
      flex: 1;
    }

    .mob {
      display: none;
    }

    .m-toggle {
      display: none;
    }

    .logo svg {
      width: 158px;
    }
  }
`;

export type NavigationVariants = 'landingpage' | 'default';

@customElement('kps-nav')
export class Navigation extends LitElement {
  static styles = styles;

  button: Button | undefined = undefined;

  @property({ type: Boolean })
    sticky = false;

  @property({ type: Boolean, reflect: true })
    open = false;

  @property({ type: String, reflect: true })
    variant: NavigationVariants = 'default';

  handleScroll = () => {
    this.sticky = window.scrollY > 0;
    this.dataset.sticky = this.sticky ? 'true' : 'false';
    this.updateColors();
  };

  updateColors() {
    const windowWidth = window.innerWidth;
    if (this.button) {
      let color = windowWidth < LAYOUT_SWITCH_AT ? 'primary' : 'success';

      if (!this.open) {
        color = 'success';
      }

      this.button.color = color as 'success' | 'primary';
    }
  }

  firstUpdated() {
    const slot = this.renderRoot.querySelector(
      'slot[name=actions]',
    ) as HTMLSlotElement;

    this.button = (slot?.assignedNodes()[0] as HTMLElement)?.querySelector(
      'nine-button',
    ) as Button;

    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('resize', this.handleScroll, { passive: true });
    this.setActiveNav();
    this.setupLinkHooks();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  }

  setupLinkHooks() {
    console.log(this);
    const links = document.querySelectorAll('a');
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        // check if link has hash
        if (link.hash) {
          // check if link has hash and is in the page
          const el = document.querySelector(link.hash) as null | HTMLElement;
          if (el) {
            // scroll to hash
            // animate(
            //   1500,
            //   (progress) => {
            //     window.scrollTo(0, progress);
            //   },
            //   {
            //     range: [window.scrollY, el.offsetTop - this.offsetHeight - 30],
            //   },
            // );
            window.location.hash = link.hash;
            e.preventDefault();
          }
        }
      });
    });
  }

  setActiveNav() {
    const links = [...this.querySelectorAll('a')];
    const path = window.location.pathname;

    // get link that matches the current path, ignore hash and query params
    const activeLink = links.find((link) => link.getAttribute('href')?.split('#')[0].split('?')[0].endsWith(path));

    const parentListItem = activeLink?.parentElement;

    if (parentListItem instanceof HTMLLIElement) {
      parentListItem.setAttribute('aria-current', 'page');
    }
  }

  svgBurger = html`
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.48 11.5H3.52v1h16.96v-1ZM20.48 16.16H3.52v1h16.96v-1ZM20.48 6.84H3.52v1h16.96v-1Z"
        fill="currentColor"
      />
    </svg>
  `;

  svgClose = html`
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="m12.5 12.5 4.4 4.4.85-.85-4.4-4.4L17.9 7.1l-.85-.85-4.55 4.55-4.65-4.65L7 7l4.65 4.65-4.5 4.5L8 17l4.5-4.5Z"
        fill="currentColor"
      />
    </svg>
  `;

  toggleOpen = () => {
    this.open = !this.open;
    this.updateColors();
  };

  render() {
    return html`<div
      class="center"
      open="${this.open}"
      variant="${this.variant}"
    >
      <nine-bg variant="sunrise" fade="false" curve="sunrise" class="mob">
      </nine-bg>
      <div class="m-toggle">
        <button aria-label="Toggle Navigation" @click="${this.toggleOpen}">
          ${this.open ? this.svgClose : this.svgBurger}
        </button>
      </div>
      <div class="domain">join9am.com</div>
      <div class="nav"><slot name="main-menu"></slot></div>
      <a href="/" class="logo as-link">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 636.19 154.01"><defs><style>.cls-1,.cls-2{fill:#231f20;}.cls-2{font-size:24.21px;font-family:ProximaNova-Regular, Proxima Nova;}.cls-3{letter-spacing:-0.03em;}.cls-4{letter-spacing:0em;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Content"><path class="cls-1" d="M224.52,72l-7-10.1-1.81,2.26V72h-6.91V45.16h6.91v11l8.24-11h8.53L222,57.7,233,72Z"/><path class="cls-1" d="M239,72V45.16h6.92V72Z"/><path class="cls-1" d="M273,72,261.67,55.77V72h-6.92V45.16h7.12L272.73,60.6V45.16h6.95V72Z"/><path class="cls-1" d="M301.62,44.72c5.87,0,9.49,2.88,11.47,6.23l-5.8,3a6.67,6.67,0,0,0-5.67-3.17,7.41,7.41,0,0,0-7.48,7.76,7.41,7.41,0,0,0,7.48,7.76,8.35,8.35,0,0,0,5.06-1.61V62.48h-6.15V56.73h13V67.24a15.51,15.51,0,0,1-11.86,5.22c-8,0-14.52-5.35-14.52-13.87S293.62,44.72,301.62,44.72Z"/><path class="cls-1" d="M335.79,72V45.16h13.43c6,0,9.33,4.06,9.33,8.92s-3.29,8.81-9.33,8.81H342.7V72Zm12.5-21H342.7v6h5.59a3,3,0,0,0,3.22-3A3,3,0,0,0,348.29,51Z"/><path class="cls-1" d="M378.59,44.72c8.21,0,14.32,5.7,14.32,13.87s-6.11,13.87-14.32,13.87-14.36-5.7-14.36-13.87S370.39,44.72,378.59,44.72Zm0,6.11c-4.47,0-7.31,3.37-7.31,7.76s2.84,7.76,7.31,7.76,7.28-3.42,7.28-7.76S383,50.83,378.59,50.83Z"/><path class="cls-1" d="M402.09,63a12.17,12.17,0,0,0,8.57,3.54c2.37,0,3.82-1,3.82-2.29,0-1.53-1.73-2.13-4.59-2.74-4.41-.88-10.6-2-10.6-8.36,0-4.51,3.81-8.41,10.68-8.41a16.41,16.41,0,0,1,10.91,3.74l-3.79,4.95a12.45,12.45,0,0,0-7.56-2.78c-2.29,0-3.18.93-3.18,2.09,0,1.41,1.66,1.89,4.63,2.46,4.43.92,10.54,2.2,10.54,8.28,0,5.39-4,9-11.18,9-5.42,0-9.21-1.69-11.9-4.27Z"/><path class="cls-1" d="M434.52,72V51.18H427v-6h21.91v6h-7.48V72Z"/><path class="cls-1" d="M472.2,63a12.13,12.13,0,0,0,8.57,3.54c2.36,0,3.81-1,3.81-2.29,0-1.53-1.72-2.13-4.58-2.74-4.42-.88-10.61-2-10.61-8.36,0-4.51,3.81-8.41,10.69-8.41A16.38,16.38,0,0,1,491,48.49l-3.78,4.95a12.48,12.48,0,0,0-7.57-2.78c-2.29,0-3.17.93-3.17,2.09,0,1.41,1.66,1.89,4.62,2.46,4.43.92,10.54,2.2,10.54,8.28,0,5.39-4,9-11.18,9-5.42,0-9.21-1.69-11.9-4.27Z"/><path class="cls-1" d="M504.64,72V51.18h-7.52v-6H519v6h-7.47V72Z"/><path class="cls-1" d="M526.3,45.16h7V60.88c0,3.17,1.69,5.47,5.43,5.47s5.38-2.3,5.38-5.47V45.16h7V61.09c0,6.67-3.81,11.37-12.42,11.37S526.3,67.71,526.3,61.12Z"/><path class="cls-1" d="M560,72V45.16h11.26c8.44,0,14.51,5.06,14.51,13.39S579.68,72,571.28,72Zm6.91-6h4.35a7.12,7.12,0,0,0,7.43-7.4c0-4.14-2.49-7.37-7.39-7.37h-4.39Z"/><path class="cls-1" d="M593.16,72V45.16h6.91V72Z"/><path class="cls-1" d="M621.88,44.72c8.2,0,14.31,5.7,14.31,13.87s-6.11,13.87-14.31,13.87-14.36-5.7-14.36-13.87S613.67,44.72,621.88,44.72Zm0,6.11c-4.47,0-7.32,3.37-7.32,7.76s2.85,7.76,7.32,7.76,7.27-3.42,7.27-7.76S626.3,50.83,621.88,50.83Z"/><text class="cls-2" transform="translate(208.77 109.29)">WEB SO<tspan class="cls-3" x="89.35" y="0">L</tspan><tspan class="cls-4" x="101.04" y="0">UTIONS</tspan></text><path class="cls-1" d="M46.9.67C46.43.6,40.58.13,40.58,0V3.4l3.09.54A13.28,13.28,0,0,1,54.23,16.82c-.07,2.46,0,4.93,0,7.33v105.7c0,2.4-.07,4.87,0,7.34a13.29,13.29,0,0,1-10.56,12.88l-3.09.53V154c0-.14,5.85-.61,6.32-.67,3.3-.27,6.59-.74,9.89-1.2,5.91-.8,11.83-1.74,17.75-2.67V4.54C68.62,3.6,62.7,2.67,56.79,1.87,53.49,1.4,50.2.93,46.9.67Z"/><path class="cls-1" d="M105.4,75.73c4.17-.46,8.54-1.6,11.63-4.67,2.56-2.53,4.1-6.47,4.51-11.54.33-4.54.53-16.28.53-34.76.14-7.28,1.28-10.55,3.57-13.95a17.59,17.59,0,0,1,11-7.54,20.51,20.51,0,0,1,0-2.94.29.29,0,0,1-.21-.06c-6-.34-12.44-.34-18.35,1.26a19.92,19.92,0,0,0-10.56,6.41c-2.82,3.54-3.76,8.61-4.37,13a126.33,126.33,0,0,0-.74,15.94v9.61c0,9.61-1.14,16.22-3.5,19.75s-6.38,6.74-11.83,9.34l-.4.14v2.67l.4.13c5.45,2.6,9.41,5.74,11.83,9.34s3.5,10.15,3.5,19.75v9.61a126.49,126.49,0,0,0,.74,16c.61,4.34,1.55,9.41,4.37,12.95a20,20,0,0,0,10.56,6.4c5.91,1.6,12.37,1.6,18.35,1.27a.26.26,0,0,1,.21-.07,20.38,20.38,0,0,1,0-2.93,17.59,17.59,0,0,1-11-7.54c-2.29-3.41-3.43-6.68-3.57-13.95,0-18.48-.2-30.23-.53-34.76-.41-5.08-2-9-4.51-11.55-3.09-3.07-7.46-4.2-11.63-4.67q-7.56-.9-15.13-1.2C89.15,77,88.21,77,87.14,77c1.07,0,2,0,3.13-.06Q97.83,76.64,105.4,75.73Z"/><polygon class="cls-1" points="14.96 73.09 22.11 77 14.96 80.91 11.05 88.06 7.15 80.91 0 77 7.15 73.09 11.05 65.95 14.96 73.09"/><polygon class="cls-1" points="169.5 73.09 176.65 77 169.5 80.91 165.59 88.06 161.68 80.91 154.54 77 161.68 73.09 165.59 65.95 169.5 73.09"/></g></g></svg>
      </a>
      <div class="actions-ph"></div>
      <div class="actions">
        <slot name="actions"></slot>
      </div>
      <div class="help">
        <slot name="help"></slot>
      </div>
    </div>`;
  }
}

export default Navigation;
