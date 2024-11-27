import { Api } from './Api/Api.js';
import { Element } from './WebApp/WebApp.js';
import NewStudentForm from './components/NewStudentForm.js';
import StudentTable from './components/Table.js';
import { table } from './initialize/table.js';

const menuOptions = Element.get('#menu-options');

const addStudent = Element.new('button', 'register student', { class: 'menu-option' });

if (menuOptions) menuOptions.append(
    addStudent
);

addStudent.on('click', () => {
    const content = Element.get('#content');
    if (!content) return;
    const form = new NewStudentForm();
    form.on('submit', (data) => {
        Api.createStudent(data).then(() => {
            alert('Student created');
        }).catch((error) => {
            alert(error);
        }).finally(() => {
            content.clean();
            content.append(table);
        });
    });
    form.on('cancel', () => {
        content.clean();
        content.append(table);
    });
    content.clean();
    content.append(form)
});