/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description adds a class to create components with js/ts.
 * @module saml.webapp
 * @license Apache-2.0
 */
import Element from "./Element.js";
import Events from "./Events.js";
export class Component extends Events {
    /**
     * Gets the component element.
     * @returns The component element.
     */
    getComponent() { return this.component; }
    ;
    /**
     * Renders the component.
     * @param parent The parent element.
     * @param clean If true, the parent element will be cleaned.
     * @returns The component.
     */
    render(parent, clean = false) {
        if (clean) {
            if (parent instanceof Element)
                parent.clean();
            else
                parent.innerHTML = '';
        }
        this.component.appendTo(parent);
        return this;
    }
}
export default Component;
