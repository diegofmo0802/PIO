import { Element, Component } from '../../WebApp.js';
export class SelectInput extends Component {
    component;
    placeholder;
    constructor(options, placeholder = 'select') {
        super();
        this.placeholder = placeholder;
        this.component = Element.new('select').setAttributes({
            name: 'select',
            class: 'selectInput'
        }).append(Element.new('option').text(this.placeholder), ...options.map(option => Element.new('option').text(option)));
        this.component.on('change', () => this.dispatch('send', this.getSelected()));
    }
    getSelected() {
        if (this.component.HTMLElement.value == this.placeholder)
            return '';
        return this.component.HTMLElement.value;
    }
    setSelected(option) {
        this.component.HTMLElement.value = option;
    }
}
export default SelectInput;
