import { Element, Component } from '../../WebApp.js';
export class SwitchInput extends Component {
    component;
    state;
    constructor(defaultState = true, label = '') {
        super();
        const id = 'switchInput-' + Math.random().toString(36).substring(2, 9);
        this.state = defaultState;
        this.component = Element.structure({
            type: 'div', attribs: { class: `switchInput ${this.state ? 'active' : ''}` }, childs: [
                { type: 'label', text: label, attribs: { for: id }, events: {
                        click: () => this.toggleState()
                    } },
                { type: 'div', attribs: { id, class: 'switch-track' }, childs: [
                        { type: 'div', attribs: { class: 'switch-knob' } }
                    ], events: {
                        click: () => this.toggleState()
                    } }
            ]
        });
    }
    toggleState() {
        this.state = !this.state;
        this.component.HTMLElement.classList.toggle('active');
        this.dispatch('change', this.state);
    }
    getState() {
        return this.state;
    }
}
export default SwitchInput;
