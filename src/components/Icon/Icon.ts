import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const cross = html`
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
    <path class="fill-current" id="Close" d="M14.5-25A12.515,12.515,0,0,0,2-12.5,12.515,12.515,0,0,0,14.5,0,12.515,12.515,0,0,0,27-12.5,12.515,12.515,0,0,0,14.5-25ZM19.456-9.185a.78.78,0,0,1,0,1.1l-.536.537a.78.78,0,0,1-1.1,0L14.5-10.8,11.185-7.544a.78.78,0,0,1-1.1,0L9.544-8.08a.78.78,0,0,1,0-1.1L12.8-12.5,9.544-15.815a.78.78,0,0,1,0-1.1l.537-.536a.78.78,0,0,1,1.1,0L14.5-14.2l3.315-3.251a.78.78,0,0,1,1.1,0l.536.536a.78.78,0,0,1,0,1.1L16.2-12.5Z" transform="translate(-2 25)" fill-rule="evenodd"/>
  </svg>
`;

const icons = {
  cross,
};

@customElement('kps-icon')
export default class Icon extends LitElement {
  static styles = css`
    .icon {
      display: flex;
    }

    .icon svg > path.fill-current {
      fill: currentColor;
    }
  `;

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
