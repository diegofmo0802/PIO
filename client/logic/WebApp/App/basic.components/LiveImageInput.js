import { Element, Component } from '../../WebApp.js';
import Loading from './Loading.js';
export class LiveImageInput extends Component {
    component;
    inputFile;
    label;
    preview;
    id;
    default;
    accept;
    loading;
    constructor(options = {}) {
        super();
        this.accept = options.accept ?? ['jpg', 'jpeg', 'png', 'gif'];
        this.default = options.src ?? '';
        this.id = 'liveImageInput-' + Math.random().toString(36).substring(2, 9);
        this.loading = new Loading('/client/src/logo.png');
        this.preview = Element.new('img').setAttributes({
            class: 'liveImageInput-preview',
            src: this.default
        });
        this.label = Element.new('label').setAttributes({
            for: this.id,
            class: 'liveImageInput-label'
        }).append(this.preview);
        this.inputFile = Element.new('input').setAttributes({
            type: 'file',
            accept: this.accept.map(format => '.' + format).join(','),
            required: '',
            name: 'image',
            placeholder: 'image',
            class: 'liveImageInput-input',
            id: this.id
        }).on('change', () => this.loadPreview());
        this.component = Element.new('div')
            .setAttribute('class', `liveImageInput${options.class ? ` ${options.class}` : ''}`)
            .append(this.label, this.inputFile);
        if (options.id)
            this.component.setAttribute('id', options.id);
    }
    loadPreview() {
        const file = this.inputFile.HTMLElement.files?.[0];
        if (!file) {
            this.preview.setAttribute('src', this.default);
            return;
        }
        this.loading.spawn(this.label);
        const reader = new FileReader();
        reader.onload = () => {
            this.preview.setAttribute('src', reader.result);
            this.loading.finish();
            this.dispatch('select', file);
        };
        reader.readAsDataURL(file);
    }
    getFile() {
        return this.inputFile.HTMLElement.files?.[0];
    }
}
export default LiveImageInput;
