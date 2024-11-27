import { Element, Component } from '../../WebApp.js';
export class Loading extends Component {
    component;
    constructor(icon) {
        super();
        this.component = Element.structure({
            type: 'div', attribs: { class: 'Loading Loading-spawning' }, childs: [
                { type: 'div', childs: [
                        { type: 'img', attribs: { src: icon } },
                        { type: 'span' }, { type: 'span' }
                    ] }
            ]
        });
    }
    spawn(parent, duration = 500, solid = false) {
        if (solid)
            this.component.setAttribute('solid', '');
        parent.append(this.component);
        this.component.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], { duration, iterations: 1 });
    }
    finish(duration = 500) {
        this.component.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], { duration, iterations: 1 })
            .addEventListener('finish', () => {
            this.component.remove();
            this.component.removeAttribute('solid');
        });
    }
}
export default Loading;
