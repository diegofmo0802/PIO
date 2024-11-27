/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description Adds a class to create a menu.
 * @module saml.webapp
 * @license Apache-2.0
 */
import Element from '../Element.js';
import App from './App.js';
export declare class Menu {
    private root;
    private icon;
    private title;
    private options;
    private app;
    /**
     * Creates a menu.
     * @param rootElement The root element of the menu.
     * @param app The app of the menu.
    */
    constructor(rootElement: Element<'nav'>, app: App);
    /**
     * render the menu.
     * @param buttons The buttons of the menu.
    */
    render(buttons: Menu.menuOptions): void;
}
export declare namespace Menu {
    interface menuOptions {
        [name: string]: string | ((this: HTMLElement, event: MouseEvent) => void);
    }
}
export default Menu;
