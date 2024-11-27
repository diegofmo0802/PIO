import { Element, Component } from '../../WebApp.js';
import TextInput from './TextInput.js';
import SelectInput from './SelectInput.js';
export class MultiTagInput extends Component {
    component;
    tagInput;
    tagContainer;
    limit;
    minim;
    tags;
    validator;
    constructor(options = {}) {
        super();
        const optionsList = options.options ?? [];
        const placeholder = options.placeholder ?? 'tag';
        this.limit = options.limit ?? -1;
        this.minim = options.minim ?? -1;
        this.validator = options.validator ?? ((tag) => true);
        this.tags = new Set();
        this.tagContainer = Element.new('div').setAttribute('class', 'multiTagInput-container');
        if (optionsList.length <= 0) {
            this.tagInput = new TextInput({
                placeholder: placeholder,
                button: 'add',
                validator: this.validator,
            });
            this.tagInput.on('send', (tag) => { this.addTag(tag); });
        }
        else {
            this.tagInput = new SelectInput(optionsList, placeholder);
            this.tagInput.on('send', (tag) => { this.addTag(tag); });
        }
        this.component = Element.structure({
            type: 'div', attribs: { class: 'multiTagInput' }, childs: [
                this.tagContainer,
                this.tagInput.getComponent()
            ]
        });
    }
    newTag(tag) {
        const tagElement = Element.new('span')
            .setAttribute('class', 'multiTagInput-tag')
            .text(tag).on('click', () => {
            this.deleteTag(tag, tagElement);
        });
        return tagElement;
    }
    deleteTag(tag, tagElement) {
        this.tags.delete(tag);
        tagElement.remove();
    }
    addTag(tag) {
        if (this.tags.has(tag))
            return;
        if (this.limit != -1 && this.tags.size >= this.limit)
            return this.dispatch('limit', tag);
        if (tag.length < 1 || !this.validator(tag))
            return this.dispatch('invalid', tag);
        this.tags.add(tag);
        const newTag = this.newTag(tag);
        this.tagContainer.append(newTag);
        if (this.tagInput instanceof TextInput)
            this.tagInput.clear();
        this.dispatch('add', tag);
        return newTag;
    }
    getTags() {
        return [...this.tags];
    }
}
export default MultiTagInput;
