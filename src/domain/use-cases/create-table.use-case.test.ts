import { CreateTable } from "./create-table.use-case"

describe ('CreateTableUseCase ', () => {

    test('should create tabel with defualt valueas', ()=> {
        
        const createTable = new CreateTable();

        const table = createTable.execute({ base: 2});
        const rows = table.split('\n').length;

        console.log(table);

        expect(createTable).toBeInstanceOf( CreateTable);
        expect (table).toContain('2 x 1 = 2');
        expect (table).toContain('2 x 10 = 20');
        expect(rows).toBe(10);
    });
    test('should create tabel with custom valueas', ()=> {
        
        const createTable = new CreateTable();

        const options ={
            base: 3,
            limit: 20
        }

        const table = createTable.execute( options );
        const rows = table.split('\n').length;

        console.log(table);
        expect (table).toContain('3 x 1 = 3');
        expect (table).toContain('3 x 10 = 30');
        expect (table).toContain('3 x 20 = 60');
        expect (rows).toEqual( options.limit );


    });
});
