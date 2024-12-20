
// Al llamar al proccess.argv con los valores y luego importar app, se ejecuta el codigo hasta el final. Pero haoy otra manera de hacer esto

// process.argv = ['node', 'src/app.ts', '-b', '5', '-l', '10'];
// import './app';

// Hacemos un mock para no hacer una prueba de integracion llamando al ServerApp.run y que cree todos los archivos
// Al hacer estos moks con jest functions como que el test no usa las funciones verdaderas sino las que usamos aca adentro.



import { ServerApp } from "./presentation/server-app"


describe ('Test App', () => {

    test('should call Server.run with values', async ()=> {
        
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;
        process.argv = ['node', 'src/app.ts', '-b', '10', '-l', '5', '-s', '-n', 'test-file', '-d', 'test-destination'];
        await import('./app');

        expect(serverRunMock).toHaveBeenCalledWith({ 
            base: 10, 
            limit: 5, 
            showTable: true, 
            filename: 'test-file', 
            fileDestination: 'test-destination'
        });




    });
});