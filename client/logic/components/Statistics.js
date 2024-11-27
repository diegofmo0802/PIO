import { Component, Element } from "../WebApp/WebApp.js";

/**
 * @typedef {import('../types.d.ts').student.statistics} statistics
 * @extends Component<'div', {}>
 */
export class Statistics extends Component {
    /** @protected @type {Element<'div'>} */
    component;
    /** @protected @type {Element<'p'>} */
    highestAverageStudent;
    /** @protected @type {Element<'p'>} */
    lowestAverageStudent;
    /** @protected @type {Element<'p'>} */
    generalAverage;

    constructor() {
        super();
        this.component = Element.new('div', null, { class: 'statistics-container' });
        this.highestAverageStudent = Element.new('p', 'Nombre del estudiante con mayor promedio: -');
        this.lowestAverageStudent = Element.new('p', 'Nombre del estudiante con menor promedio: -');
        this.generalAverage = Element.new('p', 'Promedio general del curso: -');

        this.component.append(
            this.highestAverageStudent,
            this.lowestAverageStudent,
            this.generalAverage
        );
    }

    /**
     * Actualiza las estadísticas
     * @param {statistics} data - Los datos de las estadísticas
     */
    updateStatistics(data) {
        this.highestAverageStudent.text(`Nombre del estudiante con mayor promedio: ${data.highestAverageStudent} - ${data.highestAverage.toFixed(2)}`);
        this.lowestAverageStudent.text(`Nombre del estudiante con menor promedio: ${data.lowestAverageStudent} - ${data.lowestAverage.toFixed(2)}`);
        this.generalAverage.text(`Promedio general del curso: ${data.generalAverage.toFixed(2)}`);
    }
}

export default Statistics;
