import Element from "../../Element.js";
import Component from "../../Component.js";
export declare class Button extends Component<'button', Element.Events> {
    protected value: string;
    protected component: Element<"button">;
    constructor(value: string, options?: Button.options);
    get text(): string;
    set text(value: string);
}
export declare namespace Button {
    interface options {
        class?: string;
        id?: string;
    }
}
export default Button;
