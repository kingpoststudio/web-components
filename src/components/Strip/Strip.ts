import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const styles = css`
  .wrap {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }

  .wrap > .strip {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 40rem;
    min-height: 8rem;
    padding: 2rem;
    color: var(--color-white);
    background-color: var(--color-primary-darker);
    transition: background-color var(--ease-time) var(--ease-type);
  }

  .wrap[color=secondary] > .strip {
    background-color: var(--color-secondary-darker);
  }

  .wrap[position=left] > .strip {
    left: 0;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }

  .wrap[position=right] > .strip {
    right: 0;
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }
`;

@customElement('kps-strip')
export default class Strip extends LitElement {
  static styles = styles;

  @property({ type: String })
    position: 'left' | 'right' = 'left';

  @property({ type: String })
    color: 'primary' | 'secondary' = 'primary';

  render() {
    return html`
      <div class="wrap" position="${this.position}" color="${this.color}">
        <div class="strip">
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }
}
