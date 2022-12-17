import { LitElement } from 'lit';
export default class Range extends LitElement {
    static styles: import("lit").CSSResult[];
    id: string;
    min: number;
    max: number;
    step: number;
    defaultMin: undefined;
    defaultMax: undefined;
    suffix: string;
    minRef: import("lit-html/directives/ref").Ref<HTMLInputElement>;
    maxRef: import("lit-html/directives/ref").Ref<HTMLInputElement>;
    disabled: boolean;
    firstUpdated(): void;
    setDefaults(): void;
    validateMinMax(): void;
    handleSubmit(e: Event): void;
    render(): import("lit").TemplateResult<1>;
}
