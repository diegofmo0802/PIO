import TextInput from "../WebApp/App/basic.components/TextInput.js";
import { Component, Element } from "../WebApp/WebApp.js";

/**
 * @typedef {import('../types.d.ts').student.data} studentData
 * @extends Component<'div', {submit: (data: studentData) => void, cancel: () => void}>
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
    }
    /**
     * get the form data
     * @returns {studentData}
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