/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description add the rule class to the app.
 * @module saml.webapp
 * @license Apache-2.0
*/
import App from './App.js';
export declare class Rule {
    urlRule: string;
    private expression;
    private authExec;
    private renderExec;
    /**
     * Creates a new rule.
     * @param urlRule The url rule.
     * @param renderExec The render function.
     * @param authExec The authentication function.
     */
    constructor(urlRule: string, renderExec: Rule.renderer, authExec?: Rule.authenticator);
    /**
     * Executes the rule.
     * @param app The app.
     */
    exec(app: App): void;
    /**
     * Tests the rule.
     * @param url The url to test.
     */
    test(url: string): boolean;
    /**
     * Tests the authentication.
     */
    testAuth(): boolean;
    /**
     * Gets the parameters from the url.
     * @param url The url.
     */
    getParams(url: string): Rule.ruleParams;
    /**
     * Creates the expression.
     * @param urlRule The url rule.
     */
    private createExpression;
}
export declare namespace Rule {
    interface ruleParams {
        [name: string]: string | undefined;
    }
    type authenticator = () => boolean;
    type renderer = (params: ruleParams, app: App) => void;
}
export default Rule;
