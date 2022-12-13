import { LitElement } from 'lit';
export default class Link extends LitElement {
    href: string;
    target: string;
    cta: boolean;
    uppercase: boolean;
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
    render(): import("lit").TemplateResult<1>;
}
