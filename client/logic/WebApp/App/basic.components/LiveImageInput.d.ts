import { Element, Component } from '../../WebApp.js';
import Loading from './Loading.js';
export declare class LiveImageInput extends Component<'div', LiveImageInput.EventMap> {
    protected component: Element<"div">;
    protected inputFile: Element<"input">;
    protected label: Element<"label">;
    protected preview: Element<"img">;
    protected id: string;
    protected default: string;
    protected accept: LiveImageInput.formats[];
    protected loading: Loading;
    constructor(options?: LiveImageInput.options);
    protected loadPreview(): void;
    getFile(): File | undefined;
}
export declare namespace LiveImageInput {
    type formats = 'jpg' | 'jpeg' | 'png' | 'gif';
    type Listener = (file: File) => void;
    interface options {
        accept?: formats[];
        src?: string;
        class?: string;
        id?: string;
    }
    type EventMap = {
        select: Listener;
    };
}
export default LiveImageInput;
