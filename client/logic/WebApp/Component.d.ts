/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description adds a class to create components with js/ts.
 * @module saml.webapp
 * @license Apache-2.0
 */
import Element from "./Element.js";
import Events from "./Events.js";
export declare abstract class Component<T extends keyof Element.Type, eventMap extends Events.EventMap = Events.EventMap> extends Events<eventMap> {
    /**
     * The component element.
     */
    protected abstract component: Element<T>;
    /**
     * Gets the component element.
     * @returns The component element.
     */
    getComponent(): Element<T>;
    /**
     * Renders the component.
     * @param parent The parent element.
     * @param clean If true, the parent element will be cleaned.
     * @returns The component.
     */
    render(parent: Element.parentType, clean?: boolean): this;
}
export default Component;
