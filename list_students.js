import './src/config/env.js';
import { closeConnection, query } from "./src/config/connection.js";

/**
 * @typedef {import('./src/types.js').student.data} student
 */

/**
 * Print a separator to the console
 * @param {number} length the length of the separator
 * @param {string} char the character to use for the separator
 */
function printSeparator(length, char = '-') {
    console.log(char.repeat(length));
}
/**
 * Print a row to the console
 * @param  {...any} columns the columns to print
 */
function printRow(...columns) {
    if (columns.length == 0) return;
    let line = '|';
    for (const column of columns) line += ` ${column} |`;
    console.log(line);
}

query('SELECT * FROM students WHERE TRUE').then(
    /**@param {student[]} rows */ (rows) => {
    // calculating mor column width;
    const moreCodeLength = Math.max(4, ...rows.map((row) => row.code.toString().length));
    const moreFirstNameLength = Math.max(10, ...rows.map((row) => row.first_name.length));
    const moreLastNameLength = Math.max(9, ...rows.map((row) => row.last_name.length));
    const separatorLength = moreCodeLength + moreFirstNameLength + moreLastNameLength + 44;
    
    // Print headers to table;
    printSeparator(separatorLength);
    printRow(
        'code'.padStart(moreCodeLength, ' '),
        'first_name'.padStart(moreFirstNameLength, ' '),
        'last_name'.padStart(moreLastNameLength, ' '),
        'note1', 'note2', 'note3', 'average'
    );
    printSeparator(separatorLength);

    // Print students from query result;
    for (const student of rows) {
        printRow(
            student.code.toString().padStart(moreCodeLength, ' '),
            student.first_name.padEnd(moreFirstNameLength, ' '),
            student.last_name.padEnd(moreLastNameLength, ' '),
            student.note1.toFixed(2).padStart(5, ' '),
            student.note2.toFixed(2).padStart(5, ' '),
            student.note3.toFixed(2).padStart(5, ' '),
            student.average.toFixed(2).padStart(7, ' ')
        );
    }
    printSeparator(separatorLength);
}).catch(console.error).finally(closeConnection);