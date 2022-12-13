import Flickity from 'flickity';
import { LitElement } from 'lit';
export default class Carousel extends LitElement {
    static styles: import("lit").CSSResult[];
    carousel: Flickity | null;
    firstUpdated(): void;
    private generateNewCarousel;
    render(): import("lit").TemplateResult<1>;
}
