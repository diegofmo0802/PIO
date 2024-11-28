import TextInput from "../WebApp/App/basic.components/TextInput.js";
import { Component, Element, Utilities } from "../WebApp/WebApp.js";

/**
 * @typedef {import('../types').student.data} studentData
 * @typedef {import('../types').student.update} studentUpdate
 * @extends Component<'div', {submit: (data: studentUpdate, element: Element<'tr'>) => void, cancel: () => void}>
 */
export class EditUserForm extends Component {
    /** @protected @type {Element<'div'>} */
    component;
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
    /** @protected @type {studentData} */
    data;
    /**
     * @param {studentData} data
     * @param {Element<'tr'>} element
     */
    constructor(data, element) { super();
        this.data = data;
        this.component = Element.new('div', null, { class: 'form-container' });
        this.firstName = new TextInput({
            placeholder: 'First Name *', name: 'firstName',
            class: 'form-input', value: data.first_name
        });
        this.lastName = new TextInput({
            placeholder: 'Last Name *', name: 'lastName',
            class: 'form-input', value: data.last_name
        });
        this.note1 = Element.new('input', null, {
            type: 'number', name: 'note1',
            placeholder: 'Note 1 (optional)', value: data.note1.toString()
        });
        this.note2 = Element.new('input', null, {
            type: 'number', name: 'note2',
            placeholder: 'Note 2 (optional)', value: data.note2.toString()
        });
        this.note3 = Element.new('input', null, {
            type: 'number', name: 'note3',
            placeholder: 'Note 3 (optional)', value: data.note3.toString()
        });
        this.error = Element.new('p', null, { class: 'form-error' });
        this.submitButton = Element.new('button', 'submit', { class: 'form-button' });
        const cancelButton = Element.new('button', 'cancel', { class: 'form-button form-cancel' });
        this.component.append(
            this.firstName, this.lastName,
            Element.new('div', null, { class: 'textInput form-input' }).append(this.note1),
            Element.new('div', null, { class: 'textInput form-input' }).append(this.note2),
            Element.new('div', null, { class: 'textInput form-input' }).append(this.note3),
            this.error,
            Element.new('div', null, { class: 'form-buttons' }).append(this.submitButton, cancelButton)
        );
        this.submitButton.on('click', () => {
            const data = this.getData(this.data);
            this.dispatch('submit', data, element);
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
     * @param {studentData} originalData
     * @returns {studentUpdate}
     */
    getData(originalData) {
        const updatedData = {};
            const first_name = this.firstName.getText();
            const last_name = this.lastName.getText();
            const note1 = parseFloat(this.note1.HTMLElement.value);
            const note2 = parseFloat(this.note2.HTMLElement.value);
            const note3 = parseFloat(this.note3.HTMLElement.value);
            if (first_name && first_name != originalData.first_name) updatedData.first_name = first_name;
            if (last_name && last_name != originalData.last_name) updatedData.last_name = last_name;
            if (note1 && note1 != originalData.note1) updatedData.note1 = note1;
            if (note2 && note2 != originalData.note2) updatedData.note2 = note2;
            if (note3 && note3 != originalData.note3) updatedData.note3 = note3;
        return updatedData;
    }
    /**
     * set the form data
     * @param {boolean} enable
     */
    setEnabled(enable) {
        this.submitButton.setAttribute('disabled', enable.toString());
    }
}
export default EditUserForm;