import { Api } from './Api/Api.js';
import { Element } from './WebApp/WebApp.js';
import NewStudentForm from './components/NewStudentForm.js';
import StudentTable from './components/Table.js';
import { statistics } from './initialize/statistic.js';
import { table, limit as tableLimitInPage, missingInPage as missingInTable, updateTable } from './initialize/table.js';

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
            console.log(table.waitingForNextEvent(), missingInTable);
            if (!table.waitingForNextEvent()) {
                const missing = missingInTable;
                const skip = tableLimitInPage - missing;
                console.log(missing, skip);
                updateTable((result) => {
                    return result.slice(skip);
                }).then((added) => {
                    if (added.length > 0)
                    table.focusRow(added[added.length - 1]);
                });
            }
        }).catch((error) => {
            alert(error);
        }).finally(() => {
            content.clean();
            content.append(statistics, table);
        });
    });
    form.on('cancel', () => {
        content.clean();
        content.append(statistics, table);
    });
    content.clean();
    content.append(form)
});