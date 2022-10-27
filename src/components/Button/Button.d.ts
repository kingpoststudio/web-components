import { LitElement, CSSResultGroup } from 'lit';
export default class Button extends LitElement {
    color: 'primary' | 'secondary' | 'tertiary' | 'gray' | 'success' | 'warning' | 'error' | 'transparent';
    theme: 'base' | 'dark' | 'darker' | 'darkest' | 'light' | 'lighter' | 'lightest';
    variant: 'fill' | 'outline';
    size: 'sm' | 'md' | 'lg' | 'icon';
    href: string;
    target: '_self' | '_blank' | '_parent' | '_top';
    active: boolean;
    uppercase: boolean;
    round: boolean;
    shadow: boolean;
    cta: boolean;
    static styles: CSSResultGroup;
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
    render(): import("lit-html").TemplateResult<1>;
}
