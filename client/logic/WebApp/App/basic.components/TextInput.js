import { Element, Component } from '../../WebApp.js';
export class TextInput extends Component {
    component;
    inputText;
    button;
    validator;
    constructor(options = {}) {
        super();
        const placeholder = options.placeholder ?? 'text';
        const textButton = options.button ?? '';
        const name = options.name ?? 'text';
        const type = options.type ?? 'text';
        this.validator = options.validator ?? ((text) => true);
        if (type == 'textarea') {
            this.inputText = Element.new('textarea').setAttributes({
                name: name,
                placeholder: placeholder,
            });
            if (options.value)
                this.inputText.HTMLElement.value = options.value;
        }
        else {
            this.inputText = Element.new('input').setAttributes({
                type: type,
                name: name,
                placeholder: placeholder,
            });
            if (options.value)
                this.inputText.HTMLElement.value = options.value;
        }
        if (textButton.length > 0) {
            this.button = Element.new('button').text(textButton);
        }
        this.component = Element.structure({
            type: 'div', attribs: { class: `textInput${options.class ? ` ${options.class}` : ''}` }, childs: [
                this.inputText, ...(this.button ? [this.button] : [])
            ]
        });
        if (options.id)
            this.component.setAttribute('id', options.id);
        this.button?.on('click', () => this.send());
        this.inputText.on('input', () => this.dispatch('input', this.getText()));
        this.inputText.on('keypress', (event) => {
            if (event.key == 'Enter')
                this.send();
        });
    }
    send() {
        const text = this.getText();
        if (this.validator(text))
            this.dispatch('send', text);
        else
            this.dispatch('invalid', text);
    }
    getText() {
        return this.inputText.HTMLElement.value;
    }
    clear() {
        this.inputText.HTMLElement.value = '';
    }
}
export default TextInput;
