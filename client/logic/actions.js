import { Api } from './Api/Api.js';
import { Element } from './WebApp/WebApp.js';
import { statistics, updateStatistics } from './initialize/statistic.js';
import { table, updateTable } from './initialize/table.js';

export function loadContent() {
    const content = Element.get('#content');
    if (!content) return void alert('main element not found');
    updateStatistics();
    updateTable();
    content.clean();
    content.append(statistics, table);
}