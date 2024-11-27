import { Element, Component } from '../../WebApp.js';
import { Drawer } from "../../QR-Code/QR.js";
import Style from 'QR-Code/Style.js';
export declare class QRGenerator extends Component<'div'> {
    protected component: Element<'div'>;
    protected Error: Element<'p'>;
    protected Viewer: Element<'img'>;
    protected showing: Promise<any> | null;
    constructor(options?: QRGenerator.options);
    generate(data: string, options?: QRGenerator.generateOptions): Promise<void>;
    protected show(drawer: Drawer, style?: QRGenerator.customizeOptions): Promise<void>;
    protected loadQrImage(drawer: Drawer, style?: QRGenerator.customizeOptions): Promise<void>;
}
export declare namespace QRGenerator {
    interface options {
        class?: string;
        id?: string;
    }
    interface generateOptions {
        correctionLevel?: string;
        style?: customizeOptions;
    }
    interface customizeOptions {
        moduleMargin?: Style.SizeValue;
        moduleRadius?: Style.SizeValue;
        background?: Style.ColorValue | Style.gradient;
        activeModule?: Style.ColorValue | Style.gradient;
        inactiveModule?: Style.ColorValue | Style.gradient;
        size?: number;
        icon?: string;
    }
}
export default QRGenerator;
