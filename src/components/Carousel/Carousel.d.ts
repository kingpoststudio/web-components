import Flickity from 'flickity';
import { LitElement } from 'lit';
export default class Carousel extends LitElement {
    static styles: import("lit").CSSResult[];
    carousel: Flickity | null;
    target: Element | undefined;
    firstUpdated(): void;
    private generateNewCarousel;
    render(): import("lit-html").TemplateResult<1>;
}
