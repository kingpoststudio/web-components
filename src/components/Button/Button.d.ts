import { LitElement } from 'lit';
import './Button.css';

export default class Button extends LitElement {
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'transparent';

  theme: 'base' | 'dark' | 'darker' | 'darkest' | 'light' | 'lighter' | 'lightest';

  variant: 'fill' | 'outline';

  href: string;

  target: string;

  cta: boolean;

  round: boolean;

  uppercase: boolean;

  static styles: import('lit').CSSResult;

  /**
     * onSlotChange
     * @param e
     * @returns void
     * Listening for a slotchange event to detect when the HubSpot CTA HTML is added
     * to the slot. Once the CTA is available, we take it's href and target attributes
     * and set them on the <a> tag.
     */
  onSlotChange(e: {
        target: HTMLSlotElement;
    }): void;

  render(): import('lit-html').TemplateResult<1>;
}
