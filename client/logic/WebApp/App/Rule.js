/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description add the rule class to the app.
 * @module saml.webapp
 * @license Apache-2.0
*/
export class Rule {
    urlRule;
    expression;
    authExec;
    renderExec;
    /**
     * Creates a new rule.
     * @param urlRule The url rule.
     * @param renderExec The render function.
     * @param authExec The authentication function.
     */
    constructor(urlRule, renderExec, authExec) {
        urlRule = !urlRule.startsWith('/') ? `/${urlRule}` : urlRule;
        urlRule = urlRule.endsWith('/') ? urlRule.slice(0, -1) : urlRule;
        this.urlRule = urlRule;
        this.expression = this.createExpression(urlRule);
        this.renderExec = renderExec;
        this.authExec = authExec ?? (() => true);
    }
    /**
     * Executes the rule.
     * @param app The app.
     */
    exec(app) {
        if (!this.testAuth())
            return;
        const params = this.getParams(app.router.getPage());
        this.renderExec(params, app);
    }
    /**
     * Tests the rule.
     * @param url The url to test.
     */
    test(url) {
        return this.expression.test(url);
    }
    /**
     * Tests the authentication.
     */
    testAuth() {
        return !this.authExec || this.authExec();
    }
    /**
     * Gets the parameters from the url.
     * @param url The url.
     */
    getParams(url) {
        const match = this.expression.exec(url);
        if (!match)
            return {};
        return { ...match.groups };
    }
    /**
     * Creates the expression.
     * @param urlRule The url rule.
     */
    createExpression(urlRule) {
        const validators = {
            param: /^\$(?<param>.+)$/,
            escape: /\\(?![\$\[\]\*\+\?\.\(\)\{\}\^\|\-])|(?<!\\)[\$\[\]\*\+\?\.\(\)\{\}\^\|\-]/gi,
        };
        const zones = urlRule.split('/').slice(1);
        let regExpString = '^';
        for (let index = 0; index < zones.length; index++) {
            const zone = zones[index];
            regExpString += '\/';
            if (validators.param.test(zone)) {
                const match = validators.param.exec(zone);
                if (match && match.groups) {
                    const param = match.groups['param']
                        .replace(validators.escape, '');
                    regExpString += `(?<${param}>[^\/]+?)`;
                }
            }
            else if (zone == '*') {
                regExpString += index < (zones.length - 1)
                    ? '(?:[^\/]+)?'
                    : '(?:.+)?';
            }
            else
                regExpString += zone;
        }
        regExpString += '\/?$';
        return new RegExp(regExpString);
        ;
    }
}
export default Rule;
