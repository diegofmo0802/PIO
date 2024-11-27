import { Element, Component } from '../../WebApp.js';
export declare class Loading extends Component<'div'> {
    protected component: Element<"div">;
    constructor(icon: string);
    spawn(parent: Element, duration?: number, solid?: boolean): void;
    finish(duration?: number): void;
}
export declare namespace Loading {
}
export default Loading;
