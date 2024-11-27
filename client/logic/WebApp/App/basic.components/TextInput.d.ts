import { Element, Component } from '../../WebApp.js';
export declare class TextInput extends Component<'div', TextInput.EventMap> {
    protected component: Element<"div">;
    protected inputText: Element<"input"> | Element<"textarea">;
    protected button?: Element<"button">;
    protected validator: TextInput.validator;
    constructor(options?: TextInput.options);
    protected send(): void;
    getText(): string;
    clear(): void;
}
export declare namespace TextInput {
    interface options {
        placeholder?: string;
        type?: 'text' | 'textarea' | 'email' | 'password';
        class?: string;
        id?: string;
        value?: string;
        name?: string;
        button?: string;
        validator?: validator;
    }
    type validator = (text: string) => boolean;
    type Listener = (text: string) => void;
    type EventMap = {
        send: Listener;
        input: Listener;
        invalid: Listener;
    };
}
export default TextInput;
