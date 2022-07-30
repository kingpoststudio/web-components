import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

const styles = css`
  .wrap {
    position: relative;
    width: 100%;
    max-width: var(--page-max-width);
    height: auto;
    padding: var(--space-2xl);
    margin: 0 auto;
  }

  ::slotted(*) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: var(--space-2xl);
  }
`;

@customElement('kps-link-cards')
class LinkCards extends LitElement {
  static styles = styles;

  render() {
    return html`
      <div class="wrap">
        <slot name="cards"></slot>
      </div>
    `;
  }
}

export default LinkCards;
