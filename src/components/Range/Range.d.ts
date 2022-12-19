import { LitElement } from 'lit';
export default class Range extends LitElement {
    static styles: import("lit").CSSResult[];
    id: string;
    type: 'mm' | 'pm';
    min: number;
    max: number;
    defaultMin: undefined;
    defaultMax: undefined;
    step: number;
    tolerance: number;
    suffix: string;
    minRef: import("lit-html/directives/ref").Ref<HTMLInputElement>;
    maxRef: import("lit-html/directives/ref").Ref<HTMLInputElement>;
    pmRef: import("lit-html/directives/ref").Ref<HTMLInputElement>;
    firstUpdated(): void;
    setDefaults(): void;
    validateMinMax(): void;
    handleSubmit(e: Event): void;
    render(): import("lit").TemplateResult<1>;
}
