// En la primer prueba se fija que se pueda crear una instancia de la clase ServerApp asi como que el metodo run sera uan funcion.

// En la segunda pruebas utiliza el objeto en el scope superior Y pone varios spyOn.
// Unos par ver log si an aparecido y cuantas veces. 
// Otros para ver si se ah llamado y de que manera los executes de CreateTable y SaveFile . 

// PARA LA TERCER PRUEBA VAMOS A COMENTAR TODA LA SEGUNDA PRUEBA. 
//En la tercer prueba se crean esos mocks con las funciones jest dentro. Con eso logramos que al correr el test no se ejecute el metodo original sino el mock.
// Mas abajo lo siguiente es asignar cada funcion original a cada mock, por lo que al correr el test no se ejecutara el metodo original sino el mock y no se cra loas carpetas ni el archivo.
// es como que las funciones no se correran realmente sino que se ejecutaran los mocks. por lo que en l aterminal de jest no se 
// veran los consol log ni los error tampoco.

import { ServerApp } from './server-app'
import { CreateTable } from '../domain/use-cases/create-table.use-case'
import { SaveFile } from '../domain/use-cases/save-file.use-case'

describe('server-app.ts', () => {

    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        fileDestination: 'test-destination',
        filename: 'test-filename'
    };

    
    test('should create ServerApp instance', () => {

        const serverApp = new ServerApp();

        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');

    });
    test('should run ServerApp with options', () => {
        // const logSpy = jest.spyOn(console, 'log');
        // const CreateTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        // const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');



        // ServerApp.run(options);

        // expect(logSpy).toHaveBeenCalledTimes(3);
        // expect(logSpy).toHaveBeenCalledWith('Server Corriendo ...');
        // expect(logSpy).toHaveBeenLastCalledWith('File created');
        
        // expect(CreateTableSpy).toHaveBeenCalledTimes(1);
        // expect(CreateTableSpy).toHaveBeenCalledWith({"base": options.base, "limit": options.limit});
        
        // expect(saveFileSpy).toHaveBeenCalledTimes(1);
        // expect(saveFileSpy).toHaveBeenCalledWith({
        //     fileContent: expect.any(String),
        //     fileDestination: options.fileDestination,
        //     filename: options.filename
        // });
    });
    test('should run method in ServerApp with custom values mock', () => {

        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;
        
        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server Corriendo ...');
        expect(createMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '1 x 2 = 2',
            fileDestination: options.fileDestination,
            filename: options.filename
        });
        expect(logMock).toHaveBeenCalledWith('File created');
        expect(logErrorMock).not.toHaveBeenCalled();
    });
});
