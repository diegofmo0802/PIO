import { Element, Events, Component } from '../../WebApp.js';
import TextInput from './TextInput.js';
import SelectInput from './SelectInput.js';
export declare class MultiTagInput extends Component<'div', MultiTagInput.EventMap> {
    protected component: Element<"div">;
    protected tagInput: TextInput | SelectInput;
    protected tagContainer: Element<'div'>;
    protected limit: number;
    protected minim: number;
    protected tags: Set<string>;
    protected validator: MultiTagInput.Validator;
    constructor(options?: MultiTagInput.options);
    protected newTag(tag: string): Element<'span'>;
    protected deleteTag(tag: string, tagElement: Element<'span'>): void;
    protected addTag(tag: string): Element<'span'> | void;
    getTags(): string[];
}
export declare namespace MultiTagInput {
    interface options {
        limit?: number;
        minim?: number;
        options?: string[];
        placeholder?: string;
        validator?: Validator;
    }
    type Validator = (tag: string) => boolean;
    type EventMap = {
        add: Events.Listener;
        invalid: Events.Listener;
        limit: Events.Listener;
    };
}
export default MultiTagInput;
