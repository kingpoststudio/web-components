import { LitElement } from 'lit';
interface GeoSection {
    id: string;
    label: string;
    svgPoints: string;
    tagCoords: {
        x: number;
        y: number;
    };
}
export default class WorldMap extends LitElement {
    static styles: import("lit").CSSResult[];
    private activeSectionId;
    constructor();
    toggleVisibleTag(e: any): void;
    flashInfoContainer(): void;
    setActiveSection(e: any): void;
    renderSectionInfo(section: GeoSection): import("lit").TemplateResult<1>;
    render(): import("lit").TemplateResult<1>;
}
export {};
