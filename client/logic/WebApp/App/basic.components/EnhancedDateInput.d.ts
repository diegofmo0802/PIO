import { Element, Component } from '../../WebApp.js';
import SelectInput from './SelectInput.js';
export declare class EnhancedDateInput extends Component<'div', EnhancedDateInput.EventMap> {
    protected static readonly MOTHS: string[];
    protected component: Element<"div">;
    protected monthSelect: SelectInput;
    protected yearSelect: SelectInput;
    protected calendarContainer: Element<"div">;
    protected selectedDates: Map<Date, Element<'span'>>;
    protected days: Map<number, EnhancedDateInput.EntryDay>;
    protected limit: number;
    protected yearRange: number;
    protected yearFillMode: EnhancedDateInput.yearFillMode;
    constructor(options?: EnhancedDateInput.Options);
    getDay(day: number): EnhancedDateInput.EntryDay;
    getSelected(): Date[];
    initialize(year: number, month: number, days: number[]): void;
    protected createMonthSelect(): SelectInput;
    protected createYearSelect(): SelectInput;
    protected createWeekdaysHeader(): Element<'div'>;
    protected updateCalendar(): void;
    protected toggleDate(dateElement: Element<'span'>, date: Date): void;
}
export declare namespace EnhancedDateInput {
    type yearFillMode = 'both' | 'backWard' | 'forWard';
    interface Options {
        limit?: number;
        yearRange?: number;
        yearFillMode?: yearFillMode;
    }
    interface EntryDay {
        dateElement: Element<'span'>;
        date: Date;
    }
    type EventMap = {
        dateChange: (dates: Date[]) => void;
        addDate: (date: Date) => void;
        removeDate: (date: Date) => void;
        initialize: () => void;
        update: (year: number, month: number) => void;
    };
}
export default EnhancedDateInput;
