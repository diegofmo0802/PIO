import Element from "../../Element.js";
import Component from "../../Component.js";
export class Button extends Component {
    value;
    component;
    constructor(value, options = {}) {
        super();
        this.value = value;
        const btnClass = 'Button' + (options.class ? ' ' + options.class : '');
        const btnId = options.id ? options.id : '';
        this.component = Element.new('button', value, {
            class: btnClass, id: btnId
        });
    }
    get text() { return this.value; }
    set text(value) { this.value = value; this.component.text(value); }
}
export default Button;
