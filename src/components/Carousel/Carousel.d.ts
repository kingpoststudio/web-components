import Flickity from 'flickity';
import { LitElement, CSSResultGroup } from 'lit';
export default class Carousel extends LitElement {
    static styles: CSSResultGroup;
    carousel: Flickity | null;
    slides: Element[];
    autoplay: number;
    private setSlides;
    private generateNewCarousel;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
