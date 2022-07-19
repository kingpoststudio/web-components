import { LitElement } from 'lit';
declare class Button extends LitElement {
    variant: 'fill' | 'outline';
    color: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    rounded: boolean;
    href: string;
    target: string;
    static styles: import("lit").CSSResult;
    renderMarkup(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
}
export default Button;
