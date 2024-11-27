/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description Adds a class that manages events.
 * @module saml.webapp
 * @license Apache-2.0
 */
export class Events {
    listeners = {};
    onceListeners = {};
    /**
     * Adds an event to the EventManager.
     * @param name The name of the event.
     * @param listener The callback that will be executed.
     */
    on(name, listener) {
        const listeners = this.listeners[name] ?? new Set();
        listeners.add(listener);
        this.listeners[name] = listeners;
    }
    /**
     * Adds an once event to the EventManager.
     * @param name The name of the event.
     * @param callback The callback that will be executed.
     */
    once(name, listener) {
        const listeners = this.onceListeners[name] ?? new Set();
        listeners.add(listener);
        this.onceListeners[name] = listeners;
    }
    /**
     * Removes an event from the EventManager.
     * @param name The name of the event to remove.
     * @param listener The callback of the event to remove.
     */
    off(name, listener) {
        const listenerList = this.listeners[name];
        if (!listenerList)
            return;
        listenerList.delete(listener);
    }
    /**
     * Removes an once event from the EventManager.
     * @param name The name of the event to remove.
     * @param listener The callback of the event to remove.
     */
    offOnce(name, listener) {
        const listenerList = this.onceListeners[name];
        if (!listenerList)
            return;
        listenerList.delete(listener);
    }
    /**
     * Removes all listeners from an event.
     * @param name The name of the event from which the callbacks will be removed.
     */
    offAll(name) {
        delete this.listeners[name];
    }
    /**
     * Removes all listeners from an once event.
     * @param name The name of the event from which the callbacks will be removed.
     */
    offAllOnce(name) {
        delete this.onceListeners[name];
    }
    /**
     * Executes an event.
     * @param name The name of the event to execute.
     * @param args The arguments that will be passed to the callbacks.
     */
    dispatch(name, ...args) {
        const listeners = this.listeners[name];
        const onceListeners = this.onceListeners[name];
        if (listeners)
            listeners.forEach(listener => listener(...args));
        if (onceListeners)
            onceListeners.forEach(listener => {
                listener(...args);
                onceListeners.delete(listener);
            });
    }
    /**
     * Returns the number of callbacks of an event.
     * @param name The name of the event.
     * @returns The number of callbacks of the event.
     */
    eventCount(name) {
        const listenerCount = this.listeners[name]?.size ?? 0;
        const onceCount = this.onceListeners[name]?.size ?? 0;
        return listenerCount + onceCount;
    }
}
export default Events;
