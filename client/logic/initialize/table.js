import { Api } from "../Api/Api.js";
import { Element } from "../WebApp/WebApp.js";
import EditUserForm from "../components/EditUserForm.js";
import StudentTable from "../components/Table.js";
import { statistics, updateStatistics } from "./statistic.js";

export const table = new StudentTable();

const limit = 10;
export let currentPage = 1;

export async function updateTable() {
    try {
        const response = await Api.getStudents(currentPage, limit);
        console.log("students query", response);
        table.addRow(...response.data);
        if (response.data.length == limit) table.dispatchNextEndEvent();
        currentPage++;
    } catch (error) {
        console.log("error", error);
    }
}

table.on('end', () => {
    updateTable();
});

table.on('delete', (student, element) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    Api.deleteStudent(student.code).then((rs) => {
        console.log("delete response", rs);
        element.remove();
        updateStatistics();
    }).catch((err) => {
        console.log("delete error", err);
        alert("Error deleting student");
    });
});

table.on('edit', (student, element) => {
    const content = Element.get('#content');
    if (!content) return;
    const form = new EditUserForm(student, element);
    form.on('submit', (data, element) => {
        console.log(data);
        Api.updateStudent(student.code, data).then((updatedStudent) => {
            alert('Student updated');
            const newRow = table.createRow(updatedStudent);
            element.replaceWith(newRow);
            element = newRow;
            updateStatistics();
        }).catch((error) => {
            alert(error);
        }).finally(() => {
            content.clean();
            element.observer.once('add', () => {
                element.HTMLElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element.HTMLElement.classList.add('table-row-selected');
                setTimeout(() => {
                    element.HTMLElement.classList.remove('table-row-selected');
                }, 1000);
            });
            content.append(statistics, table);
        });
    });
    form.on('cancel', () => {
        content.clean();
        content.append(statistics, table);
    });
    content.clean();
    content.append(form)
})