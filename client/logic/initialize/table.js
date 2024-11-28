import { Api } from "../Api/Api.js";
import { Element } from "../WebApp/WebApp.js";
import EditUserForm from "../components/EditUserForm.js";
import StudentTable from "../components/Table.js";
import { statistics, updateStatistics } from "./statistic.js";

/**
 * @typedef {import('../types.js').student.data} student
 */

export const table = new StudentTable();

export const limit = 10;
export let currentPage = 1;
export let missingInPage = 0

/**
 * 
 * @param {((students: student[]) => student[]) | null} filter 
 * @returns {Promise<Element<'tr'>[]>} the added rows
 */
export async function updateTable(filter = null) {
    try {
        const response = await Api.getStudents(currentPage, limit);
        console.log("students query", response);
        const students = !filter ? response.data : filter(response.data);
        const rows = table.addRow(...students);
        if (response.data.length == limit) {
            table.dispatchNextEndEvent();
            currentPage++;
            missingInPage = 0;
        } else {
            missingInPage = limit - response.data.length;
        }
        return rows;
    } catch (error) {
        console.log("error", error);
        return [];
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
                table.focusRow(element);
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