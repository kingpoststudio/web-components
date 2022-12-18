import { LitElement } from 'lit';
interface StepImage {
    src: string;
    alt: string;
}
interface StepBlock {
    text: string;
    position: {
        x: number;
        y: number;
        mobile?: {
            x: number;
            y: number;
        };
    };
    slides: {
        from: number;
        to: number;
    };
}
export default class Stepper extends LitElement {
    static styles: import("lit").CSSResult;
    images: StepImage[];
    blocks: StepBlock[];
    activeImage: StepImage | undefined;
    visible: boolean;
    speed: 'slow' | 'normal' | 'fast';
    fade: boolean;
    isMobile: boolean;
    animationRef: import("lit-html/directives/ref").Ref<Element>;
    constructor();
    disconnectedCallback(): void;
    handleResize: () => void;
    handleScroll: () => void;
    getBlockContent(block: StepBlock): import("lit").TemplateResult<1>;
    getImageContent(image: StepImage): import("lit").TemplateResult<1>;
    render(): import("lit").TemplateResult<1>;
}
export {};
