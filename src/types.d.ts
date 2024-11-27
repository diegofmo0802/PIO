export namespace student {
    export interface data {
        code: string;
        first_name: string;
        last_name: string;
        note1: number;
        note2: number;
        note3: number;
    }
    export type update = Partial<Omit<data, 'code'>>;
    const a: update = {
        
    }
}