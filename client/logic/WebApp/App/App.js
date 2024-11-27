/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description WebApp is a module to create web applications SPA with js/ts.
 * @module saml.webapp
 * @license Apache-2.0
 */
import Element from "../Element.js";
import Events from "../Events.js";
import Router from "./Router.js";
import Rule from "./Rule.js";
import AppComponent from "./AppComponent.js";
export class App extends Events {
    static instance;
    root;
    router;
    isInit = false;
    renderRules = [];
    components = new Map();
    /**
     * Private constructor for the App class.
     * @param rootElement The root element of the application.
     * @param components The components of the application.
     */
    constructor(rootElement, components) {
        super();
        if (rootElement instanceof Element)
            this.root = rootElement;
        else if (rootElement instanceof HTMLDivElement)
            this.root = new Element(rootElement);
        else if (typeof rootElement === 'string') {
            const root = Element.get(rootElement);
            Element.new('div', null, { id: 'root' });
            if (!root)
                throw new Error('root element not found');
            this.root = root;
        }
        else
            throw new Error('rootElement must be a string an HTMLDivElement or an Element');
        this.router = Router.getInstance();
        if (components)
            this.components = new Map(Object.entries(components));
        console.log('app root:', this.root);
    }
    /**
     * Get the instance of the App class.
     * @param rootElement The root element of the application.
     * @param components The components of the application.
     * @returns The instance of the App class.
     */
    static getInstance(rootElement, components) {
        if (App.instance)
            return App.instance;
        if (!rootElement)
            throw new Error('rootElement is required to init App singleton');
        App.instance = new App(rootElement, components);
        return App.instance;
    }
    /**
     * Add a render rule to the application.
     * @param urlRule The url rule to match.
     * @param renderExec The function to execute when the rule is matched.
     * @param authExec The function to execute to check if the user is authenticated.
     */
    addRender(urlRule, renderExec, authExec) {
        if (this.isInit)
            throw new Error('[addRender]: App is already initialized');
        this.renderRules.push(new Rule(urlRule, renderExec, authExec));
    }
    /**
     * Delete a render rule from the application.
     * @param urlRule The url rule to delete.
     */
    delRender(urlRule) {
        if (this.isInit)
            throw new Error('[delRender]: App is already initialized');
        this.renderRules = this.renderRules.filter((rule) => rule.urlRule != urlRule);
    }
    /**
     * Set the components of the application.
     * @param component The components to set.
     */
    setComponents(component) {
        if (this.isInit)
            throw new Error('[setComponent]: App is already initialized');
        for (const key in component) {
            this.addComponent(key, component[key]);
        }
    }
    /**
     * Add a component to the application.
     * @param name The name of the component.
     * @param component The component to add.
     */
    addComponent(name, component) {
        if (this.isInit)
            throw new Error('[addComponent]: App is already initialized');
        this.components.set(name, new AppComponent(component));
    }
    /**
     * Delete a component from the application.
     * @param name The name of the component to delete.
     */
    delComponent(name) {
        if (this.isInit)
            throw new Error('[delComponent]: App is already initialized');
        this.components.delete(name);
    }
    /**
     * Get a component from the application.
     * @param name The name of the component to get.
     * @returns The component.
     */
    getComponent(name) {
        const component = this.components.get(name);
        if (!component)
            throw new Error(`[getComponent]: Component "${name}" not found`);
        return component;
    }
    /**
     * Render the root element of the application.
     * @param content The content to render.
     */
    renderRoot(...content) {
        this.root.clean();
        this.root.append(...content);
    }
    /**
     * Register a worker in the application.
     * @param url The url of the worker.
     * @param options The options of the worker.
     * @returns The worker registration.
     */
    async registerWorker(url, options) {
        if (!navigator.serviceWorker)
            return null;
        try {
            const registration = await navigator.serviceWorker.register(url, options);
            if (registration.installing)
                console.log('[app]: worker installing: ', registration.installing);
            else if (registration.waiting)
                console.log('[app]: worker waiting: ', registration.waiting);
            else if (registration.active)
                console.log('[app]: worker active: ', registration.active);
            else
                console.log('[app]: worker not registered');
            return registration;
        }
        catch (err) {
            console.error('[App]: error registering worker: ', err);
            return null;
        }
    }
    /**
     * Initialize the application.
     */
    init() {
        if (this.isInit)
            return;
        this.isInit = true;
        this.on('render', () => {
            this.dispatch('routing');
            console.log('[app] >> rendering: ', this.router.getPage());
            let routed = false;
            for (const rule of this.renderRules) {
                if (rule.test(this.router.getPage())) {
                    rule.exec(this);
                    this.dispatch('routed', this.router.getPage());
                    routed = true;
                    break;
                }
            }
            // if (!routed) this.content.render(Element.new('h1', `404 - "${this.router.getPage()}" not found`));
        });
        this.router.on('change', () => this.dispatch('render'));
        this.dispatch('render');
    }
    on(name, listener) {
        super.on(name, listener);
    }
    off(name, listener) {
        super.off(name, listener);
    }
}
(function (App) {
    ;
})(App || (App = {}));
export default App;
