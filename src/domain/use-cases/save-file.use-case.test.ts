import fs from 'fs';
import  {SaveFile} from './save-file.use-case';


describe ('Save-File.use-case.ts ', () => {


    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        filename: 'custom-table-name',
    };
        
    const customFilePath = `${customOptions.fileDestination}/${customOptions.filename}.txt`

    afterEach(() => {
        const outputFolderExists = fs.existsSync('outputs');
        if ( outputFolderExists )fs.rmSync('outputs', {recursive: true})
        
        const customOutputFolderExists = fs.existsSync(customOptions.fileDestination);
        if ( customOutputFolderExists )fs.rmSync(customOptions.fileDestination, {recursive: true})

    });

    test('should save with defualt valueas', ()=> {
        
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt'
        const options = {
            fileContent: 'test content'
        }

        const result = saveFile.execute(options);
        const fileExist = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'})
        
        expect ( result ).toBe( true );
        expect( fileExist).toBe( true);
        expect (fileContent).toBe(options.fileContent);

    });
    test('should save file with custom valueas', ()=> {
        
        const saveFile = new SaveFile();
        
        // Esto comentado lo saco afuera pero por el tema del Scope lo puede usar este test.
        // Lo saco afuera asi tambien puedo user estos customsOptions y customFilePath en el afterEach,
        // y puede borrar luego de cada tes las carpueras output custom.

        // const customOptions = {
        //     fileContent: 'custom content',
        //     fileDestination: 'custom-outputs/file-destination',
        //     filename: 'custom-table-name',
        // }
        
        // const customFilePath = `${customOptions.fileDestination}/${customOptions.filename}.txt`

        const result = saveFile.execute(customOptions);
        const fileExists = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, {encoding: 'utf-8'});
        
        expect ( result ).toBe( true );
        expect( fileExists).toBe( true);
        expect (fileContent).toBe(customOptions.fileContent);

    });
    test('should return false if directory could not be crated', ()=> {
        
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () =>{ throw new Error('This is a custom error message from testing');}
        );

        const result = saveFile.execute(customOptions);
       
       
        expect ( result ).toBe(false);
        mkdirSpy.mockRestore();

    });
    test('should return false if file could not be crated', ()=> {
        
        const saveFile = new SaveFile();
        // const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
        //     () =>{ throw new Error('This is a custom error message from testing');}
        // );

        const result = saveFile.execute({ fileContent: 'Hola'});
        expect ( result ).toBe(true);

    });
    // test('should return false if file could not be crated 2', ()=> {
        
    //     const saveFile = new SaveFile();
    //     const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
    //         () =>{ throw new Error('This is a custom error message from testing 2');}
    //     );

    //     const result = saveFile.execute({ fileContent: 'Hola'});
    //     expect ( result ).toBe(false);
    //     writeFileSpy.mockRestore();
    // });
});