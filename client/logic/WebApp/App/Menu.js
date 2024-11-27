/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description Adds a class to create a menu.
 * @module saml.webapp
 * @license Apache-2.0
 */
import Element from '../Element.js';
import Button from '../App/basic.components/Button.js';
export class Menu {
    root;
    icon;
    title;
    options;
    app;
    /**
     * Creates a menu.
     * @param rootElement The root element of the menu.
     * @param app The app of the menu.
    */
    constructor(rootElement, app) {
        this.root = rootElement;
        this.app = app;
        this.icon = Element.new('img', null, { src: '/client/src/logo.png' });
        this.title = Element.new('h1', 'Sky Gallery');
        this.options = Element.new('div', null, { id: 'menuOptions' });
        const logo = Element.new('a')
            .setAttribute('class', 'Logo Button')
            .setAttribute('class', 'Logo')
            .on('click', () => this.app.router.setPage('/'))
            .append(this.icon, this.title);
        this.root.append(logo, this.options);
    }
    /**
     * render the menu.
     * @param buttons The buttons of the menu.
    */
    render(buttons) {
        this.options.clean();
        for (const key in buttons) {
            const content = buttons[key];
            const button = new Button(key);
            if (content instanceof Function)
                button.on('click', content);
            else {
                const changePage = () => this.app.router.setPage(content);
                button.on('click', changePage);
            }
            this.options.append(button);
        }
    }
}
export default Menu;
