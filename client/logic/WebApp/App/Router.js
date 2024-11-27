/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description Adds the router to the webapp.
 * @module saml.webapp
 * @license Apache-2.0
 */
import Events from "../Events.js";
export class Router extends Events {
    static instance;
    index = 0;
    history = [];
    /**
     * Creates an instance of Router.
    */
    constructor() {
        super();
        this.history.push(this.getPage());
        window.addEventListener('popstate', (event) => {
            this.history = [];
            this.index = 0;
            this.history.push(this.getPage());
            this.dispatch('change');
        });
    }
    /**
     * Gets the instance of Router.
     * @returns The instance of Router.
    */
    static getInstance() {
        if (!Router.instance)
            Router.instance = new Router();
        return Router.instance;
    }
    /**
     * Cleans the url.
     * @param url The url to clean.
     * @returns The cleaned url.
    */
    cleanUrl(url) {
        if (!url.startsWith('/'))
            url = this.getPage() + '/' + url;
        if (url.endsWith('/'))
            url = url.slice(0, -1);
        if (!url.startsWith('/'))
            url = '/' + url;
        return url;
    }
    /**
     * check if there is a previous page.
     * @returns true if there is a previous page, false otherwise.
    */
    hasPrevious() { return this.index > 0; }
    /**
     * check if there is a next page.
     * @returns true if there is a next page, false otherwise.
    */
    hasNext() { return this.index < this.history.length - 1; }
    /**
     * Gets the current page.
     * @returns The current page.
    */
    getPage() { return this.cleanUrl(window.location.pathname); }
    /**
     * Sets the current page.
     * @param page The page to set.
    */
    setPage(page) {
        page = this.cleanUrl(page);
        if (page === this.getPage())
            return;
        const newUrl = new URL(page, window.location.origin);
        window.history.pushState({}, '', newUrl);
        this.history = this.history.slice(0, this.index + 1);
        this.history.push(this.getPage());
        this.index = this.history.length - 1;
        this.dispatch('push');
        this.dispatch('change');
    }
    /**
     * Goes back to the previous page.
    */
    back() {
        if (!this.hasPrevious())
            return;
        this.index -= 1;
        const previousPage = this.history[this.index];
        if (previousPage === this.getPage())
            return;
        const newUrl = new URL(previousPage, window.location.origin);
        window.history.pushState(null, '', newUrl);
        this.dispatch('back');
        this.dispatch('change');
    }
    /**
     * Goes to the next page.
    */
    next() {
        if (!this.hasNext())
            return;
        this.index += 1;
        const nextPage = this.history[this.index];
        if (nextPage === this.getPage())
            return;
        const newUrl = new URL(nextPage, window.location.origin);
        window.history.pushState(null, '', newUrl);
        this.dispatch('next');
        this.dispatch('change');
    }
}
export default Router;
