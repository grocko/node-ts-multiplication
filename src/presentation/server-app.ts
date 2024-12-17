import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";


interface RunOptions {
    base: number,
    limit: number,
    showTable: boolean,
    filename: string, 
    fileDestination: string,
}


export class ServerApp {

    static run({base, limit, showTable, filename, fileDestination}: RunOptions) {
        console.log('Server Corriendo ...');
        const table = new CreateTable().execute({ base, limit });
        // console.log(table);
        const wasCreated = new SaveFile().execute({fileContent: table, fileDestination, filename})
        
        if ( showTable ) console.log(table);
        
        (wasCreated)
            ? console.log('File created') 
            : console.log('File no dreated');
        
        
    }
}