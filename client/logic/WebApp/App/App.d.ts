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
export declare class App extends Events {
    private static instance;
    readonly root: Element<'div'>;
    readonly router: Router;
    private isInit;
    private renderRules;
    private components;
    /**
     * Private constructor for the App class.
     * @param rootElement The root element of the application.
     * @param components The components of the application.
     */
    private constructor();
    /**
     * Get the instance of the App class.
     * @param rootElement The root element of the application.
     * @param components The components of the application.
     * @returns The instance of the App class.
     */
    static getInstance(rootElement?: string | Element | HTMLDivElement, components?: App.ComponentObject): App;
    /**
     * Add a render rule to the application.
     * @param urlRule The url rule to match.
     * @param renderExec The function to execute when the rule is matched.
     * @param authExec The function to execute to check if the user is authenticated.
     */
    addRender(urlRule: string, renderExec: Rule.renderer, authExec?: Rule.authenticator): void;
    /**
     * Delete a render rule from the application.
     * @param urlRule The url rule to delete.
     */
    delRender(urlRule: string): void;
    /**
     * Set the components of the application.
     * @param component The components to set.
     */
    setComponents(component: App.ElementObject): void;
    /**
     * Add a component to the application.
     * @param name The name of the component.
     * @param component The component to add.
     */
    addComponent(name: string, component: Element): void;
    /**
     * Delete a component from the application.
     * @param name The name of the component to delete.
     */
    delComponent(name: string): void;
    /**
     * Get a component from the application.
     * @param name The name of the component to get.
     * @returns The component.
     */
    getComponent(name: string): AppComponent;
    /**
     * Render the root element of the application.
     * @param content The content to render.
     */
    renderRoot(...content: Element[]): void;
    /**
     * Register a worker in the application.
     * @param url The url of the worker.
     * @param options The options of the worker.
     * @returns The worker registration.
     */
    registerWorker(url: string, options: App.WorkerOptions): Promise<ServiceWorkerRegistration | null>;
    /**
     * Initialize the application.
     */
    init(): void;
    on(name: 'render', listener: Events.Listener): void;
    on(name: 'routing', listener: Events.Listener): void;
    on(name: 'routed', listener: App.routedCallBack): void;
    off(name: 'render', listener: Events.Listener): void;
    off(name: 'routing', listener: Events.Listener): void;
    off(name: 'routed', listener: App.routedCallBack): void;
}
export declare namespace App {
    type appRenderer = Rule.renderer;
    type appAuthenticator = Rule.authenticator;
    type routedCallBack = (page: string) => void;
    type ElementObject = {
        [key: string]: Element;
    };
    interface ComponentObject {
        [key: string]: AppComponent;
    }
    interface WorkerOptions {
        type?: 'module' | 'classic';
        scope?: string;
        updateViaCache?: 'all' | 'imports' | 'none';
    }
}
export default App;
