import fs from 'fs';


export interface SaveFileUseCase {
    execute: ( options: Options ) => boolean;
}

export interface Options {
    fileContent  : string;
    fileDestination? : string;
    filename?    : string;
}


export class SaveFile implements SaveFileUseCase {

    constructor(
        /***
         * repository: StorageRepository
         */

    ){}

    execute ({fileContent, fileDestination = 'outputs' , filename = 'table'}: Options): boolean{
        
        try {
            
            fs.mkdirSync(fileDestination, { recursive : true });
            fs.writeFileSync(`${ fileDestination}/${filename}.txt`, fileContent);
            console.log('File created');
            return true;

        } catch (error) {
            console.error(error);
            return false;
        }

    }
}