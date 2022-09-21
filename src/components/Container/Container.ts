import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('kps-container')
export default class Container extends LitElement {
  static styles = css`
  :host {
    display: block;
    margin: 0 auto;
    width: 100%;
    max-width: var(--page-max-width);
    box-sizing: border-box;
  }

  :host([padding-x]) {
    padding-inline: var(--space-md);
  }

  :host([padding-y]) {
    padding-block: var(--space-md);
  }

  :host([padding-x='2xl']) {
      padding-inline: var(--space-2xl);
    }

  :host([padding-y='2xl']) {
    padding-block: var(--space-2xl);
  }

  :host([padding-x="none"]) {
    padding-inline: 0;
  }

  :host([padding-y="none"]) {
    padding-block: 0;
  }

  @media (min-width: 768px) {
    :host([padding-x='md']) {
      padding-inline: var(--space-md);
    }

    :host([padding-y='md']) {
      padding-block: var(--space-md);
    }

    :host([padding-x='lg']) {
      padding-inline: var(--space-lg);
    }

    :host([padding-y='lg']) {
      padding-block: var(--space-lg);
    }

    :host([padding-x='xl']) {
      padding-inline: var(--space-xl);
    }

    :host([padding-y='xl']) {
      padding-block: var(--space-xl);
    }

    :host([padding-x='2xl']) {
      padding-inline: var(--space-2xl);
    }

    :host([padding-y='2xl']) {
      padding-block: var(--space-2xl);
    }
    
    :host([padding-x='3xl']) {
      padding-inline: var(--space-3xl);
    }

    :host([padding-y='3xl']) {
      padding-block: var(--space-3xl);
    }

    :host([padding-x='4xl']) {
      padding-inline: var(--space-4xl);
    }

    :host([padding-y='4xl']) {
      padding-block: var(--space-4xl);
    }
  }

  :host([full-width]) {
    max-width: 100%;
  }
`;

  @property({ type: String, attribute: 'padding-x' })
    paddingX = '';

  @property({ type: String, attribute: 'padding-y' })
    paddingY = '';

  @property({ type: Boolean, attribute: 'full-width' })
    fullWidth = false;

  protected render() {
    return html`<slot></slot>`;
  }
}
