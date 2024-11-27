/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description Adds the router to the webapp.
 * @module saml.webapp
 * @license Apache-2.0
 */
import Events from "../Events.js";
export declare class Router extends Events<Router.EventMap> {
    private static instance;
    private index;
    private history;
    /**
     * Creates an instance of Router.
    */
    private constructor();
    /**
     * Gets the instance of Router.
     * @returns The instance of Router.
    */
    static getInstance(): Router;
    /**
     * Cleans the url.
     * @param url The url to clean.
     * @returns The cleaned url.
    */
    cleanUrl(url: string): string;
    /**
     * check if there is a previous page.
     * @returns true if there is a previous page, false otherwise.
    */
    hasPrevious(): boolean;
    /**
     * check if there is a next page.
     * @returns true if there is a next page, false otherwise.
    */
    hasNext(): boolean;
    /**
     * Gets the current page.
     * @returns The current page.
    */
    getPage(): string;
    /**
     * Sets the current page.
     * @param page The page to set.
    */
    setPage(page: string): void;
    /**
     * Goes back to the previous page.
    */
    back(): void;
    /**
     * Goes to the next page.
    */
    next(): void;
}
export declare namespace Router {
    type EventMap = {
        [name in ('change' | 'push' | 'back' | 'next')]: Events.Listener;
    };
}
export default Router;
