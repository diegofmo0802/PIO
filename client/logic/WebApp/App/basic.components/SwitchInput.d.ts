import { Element, Component } from '../../WebApp.js';
export declare class SwitchInput extends Component<'div', SwitchInput.EventMap> {
    protected component: Element<"div">;
    protected state: boolean;
    constructor(defaultState?: boolean, label?: string);
    toggleState(): void;
    getState(): boolean;
}
export declare namespace SwitchInput {
    type Listener = (state: boolean) => void;
    type EventMap = {
        change: Listener;
    };
}
export default SwitchInput;
