export namespace student {
    export interface data {
        code: number;
        first_name: string;
        last_name: string;
        note1: number;
        note2: number;
        note3: number;
        average: number;
    }
    export type update = Partial<Omit<data, 'code' | 'average'>>;
    export type create = Omit<data, 'note1' | 'note2' | 'note3' | 'average'> & {
        note1: number | null;
        note2: number | null;
        note3: number | null;
    };
    export type statistics = {
        highestAverageStudent: string;
        highestAverage: number;
        lowestAverageStudent: string;
        lowestAverage: number;
        generalAverage: number;
    }
}