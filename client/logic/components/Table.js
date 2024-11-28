import { Component, Element } from "../WebApp/WebApp.js";

/**
 * @typedef {import('../types.d.ts').student.data} studentData
 * @extends Component<'div', {
 *      end: () => void,
 *      edit: (data: studentData, element: Element<'tr'>) => void,
 *      delete: (code: studentData, element: Element<'tr'>) => void
 * }>
 */
export class StudentTable extends Component {
    /** @protected @type {Element<'div'>} */
    component;
    /** @protected @type {Element<'table'>} */
    table;
    /** @protected @type {Element<'tbody'>} */
    body;
    /** @protected @type {Element<'tr'>} */
    endItem;
    /** @protected @type {Element<'tr'> | null} */
    finalRow = null;
    /** @protected @type {boolean} */
    dispatchNextEnd = false;
    constructor() { super();
        this.component = Element.new('div', null, { class: 'table-container' });
        this.table = Element.new('table', null, { class: 'table' });
        this.body = Element.new('tbody', null, { class: 'table-body' });
        this.table.append(
            Element.new('thead', null, { class: 'table-head' }).append(
                Element.new('th', 'code'),
                Element.new('th', 'first name'),
                Element.new('th', 'last name'),
                Element.new('th', 'note 1'),
                Element.new('th', 'note 2'),
                Element.new('th', 'note 3'),
                Element.new('th', 'average'),
                Element.new('th', 'edit'),
                Element.new('th', 'delete')
            )
        )
        this.endItem = Element.new('tr', null, { class: 'table-row' }).append(
            ...(() => {
                const rows = [];
                for (let i = 0; i < 7; i++) {
                    rows.push(Element.new('td', '-'));
                }
                return rows;
            })()
        )
        this.table.append(this.endItem);
        this.table.append(this.body);
        this.component.append(this.table);

        this.endItem.observer.on('visible', () => {
            if (!this.dispatchNextEnd) return;
            this.dispatchNextEnd = false;
            this.dispatch('end');
        });
    }
    /**
     * dispatch the end event
     */
    dispatchNextEndEvent() {
        this.dispatchNextEnd = true;
    }
    waitingForNextEvent() {
        return this.dispatchNextEnd;
    }
    /**
     * set the table data
     * @param {...studentData} data - The data to add to the table
     */
    setData(...data) {
        this.useEndEvent = false;
        this.body.clean();
        this.addRow(...data);
        this.endItem.remove();
        this.body.append(this.endItem);
    }
    /**
     * add a row to the table
     * @param {...studentData} data - The data to add to the table
     * @returns {Element<'tr'>[]} - The rows added to the table
     */
    addRow(...data) {
        const rows = [];
        for (let student of data) {
            const row = this.createRow(student);
            rows.push(row);
            this.body.append(row);
        }
        this.finalRow = rows[rows.length - 1];
        this.endItem.remove();
        this.body.append(this.endItem);
        return rows;
    }
    /**
     * @public
     * create a row for the table
     * @param {studentData} student - The student data
     * @returns {Element<'tr'>} - The row element
     */
    createRow(student) {
        const row = Element.new('tr', null, { class: 'table-row' }).append(
            Element.new('td', student.code.toString()),
            Element.new('td', student.first_name),
            Element.new('td', student.last_name),
            Element.new('td', student.note1.toFixed(1) || '-'),
            Element.new('td', student.note2.toFixed(1) || '-'),
            Element.new('td', student.note3.toFixed(1) || '-'),
            Element.new('td', student.average.toFixed(2) || '-')
        );
        row.append(...this.createTableActions(student, row));
        return row;
    }
    /**
     * @protected
     * create the table actions
     * @param {studentData} student - The student data
     * @param {Element<'tr'>} element - The element to append the actions to
     */
    createTableActions(student, element) {
        return [
            Element.new('td').append(Element.new('button', 'edit', { class: 'table-action' }).on('click', () => {
                this.dispatch('edit', student, element);
            })),
            Element.new('td').append(Element.new('button', 'delete', { class: 'table-action' }).on('click', () => {
                this.dispatch('delete', student, element);
            }))
        ]
    }

    /**
     * @public
     * focus a row
     * @param {Element<'tr'>} row - The row to focus
     */
    focusRow(row) {
        row.HTMLElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        row.HTMLElement.classList.add('table-row-selected');
        setTimeout(() => {
            row.HTMLElement.classList.remove('table-row-selected');
        }, 1000);
    }
}
export default StudentTable;