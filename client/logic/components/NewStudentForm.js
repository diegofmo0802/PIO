import TextInput from "../WebApp/App/basic.components/TextInput.js";
import { Component, Element, Utilities } from "../WebApp/WebApp.js";

/**
 * @typedef {import('../types.d.ts').student.data} studentData
 * @typedef {import('../types.d.ts').student.create} studentCreate
 * @extends Component<'div', {submit: (data: studentCreate) => void, cancel: () => void}>
 */
export class NewStudentForm extends Component {
    /** @protected @type {Element<'div'>} */
    component;
    /** @protected @type {Element<'input'>} */
    code;
    /** @protected @type {TextInput} */
    firstName;
    /** @protected @type {TextInput} */
    lastName;
    /** @protected @type {Element<'input'>} */
    note1;
    /** @protected @type {Element<'input'>} */
    note2;
    /** @protected @type {Element<'input'>} */
    note3;
    /** @protected @type {Element<'p'>} */
    error;
    /** @protected @type {Element<'button'>} */
    submitButton;
    constructor() { super();
        this.component = Element.new('div', null, { class: 'form-container' });
        this.code = Element.new('input', null, {
            type: 'number', name: 'code',
            placeholder: 'Code *',
        });
        this.firstName = new TextInput({
            placeholder: 'First Name *', name: 'firstName',
            class: 'form-input'
        });
        this.lastName = new TextInput({
            placeholder: 'Last Name *', name: 'lastName',
            class: 'form-input'
        });
        this.note1 = Element.new('input', null, {
            type: 'number', name: 'note1',
            placeholder: 'Note 1 (optional)',
        });
        this.note2 = Element.new('input', null, {
            type: 'number', name: 'note2',
            placeholder: 'Note 2 (optional)',
        });
        this.note3 = Element.new('input', null, {
            type: 'number', name: 'note3',
            placeholder: 'Note 3 (optional)',
        });
        this.error = Element.new('p', null, { class: 'form-error' });
        this.submitButton = Element.new('button', 'submit', { class: 'form-button' });
        const cancelButton = Element.new('button', 'cancel', { class: 'form-button form-cancel' });
        this.component.append(
            Element.new('div', null, { class: 'textInput form-input' }).append(this.code),
            this.firstName, this.lastName,
            Element.new('div', null, { class: 'textInput form-input' }).append(this.note1),
            Element.new('div', null, { class: 'textInput form-input' }).append(this.note2),
            Element.new('div', null, { class: 'textInput form-input' }).append(this.note3),
            this.error,
            Element.new('div', null, { class: 'form-buttons' }).append(this.submitButton, cancelButton)
        );
        this.submitButton.on('click', () => {
            const data = this.getData();
            this.dispatch('submit', data);
        });
        cancelButton.on('click', () => {
            this.dispatch('cancel');
        });
        this.note1.on('input', this.getNumericParser(0, 5, this.note1));
        this.note2.on('input', this.getNumericParser(0, 5, this.note2));
        this.note3.on('input', this.getNumericParser(0, 5, this.note3));
    }
    /**
     * @protected
     * @param {number} min
     * @param {number} max
     * @param {Element<'input'>} element
     * @returns {() => void}
     */
    getNumericParser(min, max, element) {
        return Utilities.debounce(() => {
            const note1 = parseFloat(element.HTMLElement.value);
            if (isNaN(note1) || note1 < min) return element.HTMLElement.value = '0';
            if (note1 > max) return element.HTMLElement.value = '5';
        }, 700).bind(this)
    }
    /**
     * get the form data
     * @returns {studentCreate}
     */
    getData() {
        return {
            code: parseInt(this.code.HTMLElement.value),
            first_name: this.firstName.getText(),
            last_name: this.lastName.getText(),
            note1: parseFloat(this.note1.HTMLElement.value),
            note2: parseFloat(this.note2.HTMLElement.value),
            note3: parseFloat(this.note3.HTMLElement.value)
        };
    }
    /**
     * set the form data
     * @param {boolean} enable
     */
    setEnabled(enable) {
        this.submitButton.setAttribute('disabled', enable.toString());
    }
}
export default NewStudentForm;