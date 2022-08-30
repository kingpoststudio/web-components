import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const chevron = html`
  <svg xmlns="http://www.w3.org/2000/svg" width="13.488" height="7.673" viewBox="0 0 13.488 7.673">
    <path class="fill-current stroke-current" d="M.614,6h0L0,5.442,6,0l6,5.442L11.386,6,6,1.116.615,6Z" transform="translate(0.744 0.675)" stroke-miterlimit="10" stroke-width="1" />
  </svg>
`;

const cross = html`
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
    <path class="fill-current" d="M14.5-25A12.515,12.515,0,0,0,2-12.5,12.515,12.515,0,0,0,14.5,0,12.515,12.515,0,0,0,27-12.5,12.515,12.515,0,0,0,14.5-25ZM19.456-9.185a.78.78,0,0,1,0,1.1l-.536.537a.78.78,0,0,1-1.1,0L14.5-10.8,11.185-7.544a.78.78,0,0,1-1.1,0L9.544-8.08a.78.78,0,0,1,0-1.1L12.8-12.5,9.544-15.815a.78.78,0,0,1,0-1.1l.537-.536a.78.78,0,0,1,1.1,0L14.5-14.2l3.315-3.251a.78.78,0,0,1,1.1,0l.536.536a.78.78,0,0,1,0,1.1L16.2-12.5Z" transform="translate(-2 25)" fill-rule="evenodd"/>
  </svg>
`;

const facebook = html`
  <svg xmlns="http://www.w3.org/2000/svg" width="14.622" height="28" viewBox="0 0 14.622 28">
    <path class="fill-current" d="M89.489,28V15.244h4.356l.622-4.978H89.489V7.156c0-1.4.467-2.489,2.489-2.489h2.644V.156C94,.156,92.444,0,90.733,0,87,0,84.356,2.333,84.356,6.533v3.733H80v4.978h4.356V28Z" transform="translate(-80)" fill-rule="evenodd"/>
  </svg>
`;

const hamburger = html`
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14">
    <line class="stroke-current" x2="20" transform="translate(0 1)" fill="none" stroke-width="2"/>
    <line class="stroke-current" x2="20" transform="translate(0 7)" fill="none" stroke-width="2"/>
    <line class="stroke-current" x2="20" transform="translate(0 13)" fill="none" stroke-width="2"/>
  </svg>
`;

const instagram = html`
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
  <path class="fill-current" d="M14,2.489a42.927,42.927,0,0,1,5.6.156,7.215,7.215,0,0,1,2.644.467,5.463,5.463,0,0,1,2.644,2.644A7.215,7.215,0,0,1,25.356,8.4c0,1.4.156,1.867.156,5.6a42.926,42.926,0,0,1-.156,5.6,7.215,7.215,0,0,1-.467,2.644,5.463,5.463,0,0,1-2.644,2.644,7.215,7.215,0,0,1-2.644.467c-1.4,0-1.867.156-5.6.156a42.926,42.926,0,0,1-5.6-.156,7.215,7.215,0,0,1-2.644-.467,5.463,5.463,0,0,1-2.644-2.644A7.215,7.215,0,0,1,2.644,19.6c0-1.4-.156-1.867-.156-5.6a42.927,42.927,0,0,1,.156-5.6,7.215,7.215,0,0,1,.467-2.644A5.587,5.587,0,0,1,4.2,4.2,2.63,2.63,0,0,1,5.756,3.111,7.215,7.215,0,0,1,8.4,2.644,42.927,42.927,0,0,1,14,2.489M14,0A45.962,45.962,0,0,0,8.244.156,9.6,9.6,0,0,0,4.822.778,6.09,6.09,0,0,0,2.333,2.333,6.09,6.09,0,0,0,.778,4.822,7.088,7.088,0,0,0,.156,8.244,45.962,45.962,0,0,0,0,14a45.962,45.962,0,0,0,.156,5.756,9.6,9.6,0,0,0,.622,3.422,6.09,6.09,0,0,0,1.556,2.489,6.09,6.09,0,0,0,2.489,1.556,9.6,9.6,0,0,0,3.422.622A45.962,45.962,0,0,0,14,28a45.962,45.962,0,0,0,5.756-.156,9.6,9.6,0,0,0,3.422-.622,6.526,6.526,0,0,0,4.044-4.044,9.6,9.6,0,0,0,.622-3.422C27.844,18.2,28,17.733,28,14a45.962,45.962,0,0,0-.156-5.756,9.6,9.6,0,0,0-.622-3.422,6.09,6.09,0,0,0-1.556-2.489A6.09,6.09,0,0,0,23.178.778,9.6,9.6,0,0,0,19.756.156,45.962,45.962,0,0,0,14,0m0,6.844A7.04,7.04,0,0,0,6.844,14,7.156,7.156,0,1,0,14,6.844m0,11.822A4.583,4.583,0,0,1,9.333,14,4.583,4.583,0,0,1,14,9.333,4.583,4.583,0,0,1,18.667,14,4.583,4.583,0,0,1,14,18.667M21.467,4.822a1.711,1.711,0,1,0,1.711,1.711,1.726,1.726,0,0,0-1.711-1.711" fill-rule="evenodd" />
</svg>
`;

const linkedin = html`
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26.043" height="26" viewBox="0 0 26.043 26">
    <defs>
      <clipPath id="clip-path">
        <rect width="26.043" height="26" fill="none" />
      </clipPath>
    </defs>
    <g clip-path="url(#clip-path)">
      <path class="fill-current" d="M.428,8.634h5.4V26H.428ZM3.129,0A3.13,3.13,0,1,1,0,3.129,3.131,3.131,0,0,1,3.129,0" />
      <path class="fill-current" d="M54.688,49.109h5.178v2.372h.074a5.673,5.673,0,0,1,5.108-2.8c5.462,0,6.471,3.6,6.471,8.274v9.526H66.127V58.03c0-2.015-.039-4.605-2.806-4.605-2.809,0-3.237,2.194-3.237,4.459v8.591h-5.4Z" transform="translate(-45.474 -40.475)" />
    </g>
  </svg>
`;

const twitter = html`
  <svg xmlns="http://www.w3.org/2000/svg" width="33.543" height="26.834" viewBox="0 0 33.543 26.834">
    <path class="fill-current" d="M14.549,7387.833a19.289,19.289,0,0,0,19.581-19.278c0-.294,0-.586-.02-.876a13.886,13.886,0,0,0,3.433-3.507,13.826,13.826,0,0,1-3.951,1.065,6.818,6.818,0,0,0,3.026-3.748,13.9,13.9,0,0,1-4.371,1.646,6.965,6.965,0,0,0-9.737-.294,6.718,6.718,0,0,0-1.991,6.474,19.654,19.654,0,0,1-14.184-7.078,6.716,6.716,0,0,0,2.132,9.042,6.9,6.9,0,0,1-3.125-.846v.085a6.806,6.806,0,0,0,5.521,6.641,6.939,6.939,0,0,1-3.106.115,6.878,6.878,0,0,0,6.428,4.708,13.95,13.95,0,0,1-8.547,2.906,14.5,14.5,0,0,1-1.639-.1,19.724,19.724,0,0,0,10.549,3.038" transform="translate(-4 -7361)" fill-rule="evenodd" />
  </svg>
`;

const youtube = html`
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="42" height="29" viewBox="0 0 42 29">
    <defs>
      <clipPath id="clip-path">
        <rect width="42" height="29" transform="translate(-0.349 0)" fill="none"/>
      </clipPath>
    </defs>
    <g transform="translate(0.612 -0.065)">
      <g transform="translate(-0.262 0.065)" clip-path="url(#clip-path)">
        <path class="fill-current" d="M40.323,4.531A5.174,5.174,0,0,0,36.682.866C33.47,0,20.592,0,20.592,0S7.713,0,4.5.866A5.174,5.174,0,0,0,.861,4.531C0,7.763,0,14.508,0,14.508s0,6.744.861,9.977A5.175,5.175,0,0,0,4.5,28.149c3.212.866,16.09.866,16.09.866s12.878,0,16.09-.866a5.175,5.175,0,0,0,3.641-3.665c.861-3.232.861-9.977.861-9.977s0-6.744-.861-9.977M16.38,20.631V8.384l10.764,6.124Z" transform="translate(0.445 -0.18)" fill="#858196"/>
      </g>
    </g>
  </svg>
`;

const icons = {
  chevron,
  cross,
  facebook,
  hamburger,
  instagram,
  linkedin,
  twitter,
  youtube,
};

const styles = css`
  .icon {
    display: flex;
  }

  .icon svg .fill-current {
    fill: currentColor;
  }

  .icon svg .stroke-current {
    stroke: currentColor;
  }
`;

@customElement('kps-icon')
export default class Icon extends LitElement {
  static styles = styles;

  @property({ type: String })
    icon: string = '';

  get iconSvg() {
    return icons[this.icon as keyof typeof icons];
  }

  render() {
    return html`
      <div class="icon">${this.iconSvg}</div>
    `;
  }
}
