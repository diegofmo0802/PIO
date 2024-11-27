import { Element, Component } from '../../WebApp.js';
export declare class SelectInput<options extends string[] = string[]> extends Component<'select', SelectInput.EventMap<options>> {
    protected component: Element<"select">;
    protected placeholder: string;
    constructor(options: options, placeholder?: string);
    getSelected(): options[number];
    setSelected(option: options[number]): void;
}
export declare namespace SelectInput {
    type Listener<options extends string[] = string[]> = (selected: options[number]) => void;
    type EventMap<options extends string[] = string[]> = {
        send: Listener<options>;
    };
}
export default SelectInput;
