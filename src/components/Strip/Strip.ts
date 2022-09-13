import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const styles = css`
  :host {
    width: 100%;
    height: 100%;
  }

  .wrap {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }

  .wrap > .strip {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 40rem;
    padding: 2rem;
    color: var(--color-primary-dark);
    background: var(--color-gray-lightest);
    transition: background var(--ease-time) var(--ease-type);
  }

  .wrap[color="secondary"] > .strip {
    color: var(--color-secondary-darker);
  }

  .wrap[color="secondary"][theme="dark"] > .strip {
    color: var(--color-white);
    background: var(--color-secondary-dark);
  }

  .wrap[position="left"] > .strip {
    left: 0;
    padding-left: 0;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }

  .wrap[position="right"] > .strip {
    right: 0;
    padding-right: 0;
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }

  .wrap > .strip:after {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: inherit;
  }

  .wrap[position="left"] > .strip:after {
    right: 100%;
  }

  .wrap[position="right"] > .strip:after {
    left: 100%;
  }

  @media (min-width: 768px) {
    .wrap > .strip {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .wrap[position="left"] > .strip {
      padding-left: 25%;
    }

    .wrap[position="right"] > .strip {
      padding-right: 25%;
    }
  }
`;

@customElement('kps-strip')
export default class Strip extends LitElement {
  static styles = styles;

  @property({ type: String })
    position: 'left' | 'right' = 'left';

  @property({ type: String })
    color: 'primary' | 'secondary' = 'primary';

  @property({ type: String })
    theme: 'light' | 'dark' = 'dark';

  render() {
    return html`
      <div class="wrap" position="${this.position}" theme="${this.theme}" color="${this.color}">
        <div class="strip">
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }
}
