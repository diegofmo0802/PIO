/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description append utilities to webapp.
 * @module saml.webapp
 * @license Apache-2.0
 */
export declare class Utilities {
    /**
     * create a debounced function to prevent multiple calls in a short period of time.
     * @param func The function to debounce.
     * @param delay The delay in milliseconds.
     * @returns The debounced function.
     */
    static debounce<FN extends Utilities.debounceFunction>(func: FN, delay?: number): Utilities.debounceResult<FN>;
}
export declare namespace Utilities {
    type debounceFunction = (...args: any) => void;
    type debounceResult<FN extends debounceFunction> = (...args: Parameters<FN>) => void;
}
export default Utilities;
