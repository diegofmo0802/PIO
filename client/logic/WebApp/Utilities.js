/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description append utilities to webapp.
 * @module saml.webapp
 * @license Apache-2.0
 */
export class Utilities {
    /**
     * create a debounced function to prevent multiple calls in a short period of time.
     * @param func The function to debounce.
     * @param delay The delay in milliseconds.
     * @returns The debounced function.
     */
    static debounce(func, delay = 500) {
        let timeOutID;
        function debounced(...args) {
            if (timeOutID)
                clearTimeout(timeOutID);
            function timeOut() {
                func(...args);
                clearTimeout(timeOutID);
            }
            timeOutID = setTimeout(timeOut, delay);
        }
        return debounced;
    }
}
export default Utilities;
