export interface CreateTableUseCase {
    execute: (options: CreateTableOptions ) => string;
}

export interface CreateTableOptions {
    base: number;
    limit?: number;
}


export class CreateTable implements CreateTableUseCase {

    constructor(
        /****
         * DI - Dependecy Injection
         */


    ){}

    execute({ base, limit = 10 }: CreateTableOptions){
        let outputMessage = ''
        for(let i =1; i <= limit; i++){
            outputMessage += `${base} x ${i} = ${base * i}`;

            // Esta IF se agrega para que solo agregue un salto de linea en todas las filas salvo en la ultima.
            // De esta manera en el test podemos decie que verifique que sean 10 lineas cuando -l va por defuaul
            if (i < limit) outputMessage += '\n';
        }

        return outputMessage
    }

};