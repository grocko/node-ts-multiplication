// cuando importamos yarg es como se ejecuta y da error el terting de una. Debi dejarlo comentado.(no lo borre a proposito)
// esto pasa porque NO se esta mandando la base y es un argumento requerido. 
// Algo asi como cuando ejecutas la apli y no le pasas base, que yargs da el help y aviso que te falta base

// Ese yarg es una variable que es un objeto, que se crea en args.plugin.ts por medio de la funcion yargs.
// se le pasa el hideBin para que oculte unos paths medio largos pero crea el onjetoc con todas las opciones que yo defina con sus carateristicas
// Ese objeto yarg va a ser usado en el resto de la aplicaiocn para recoger esos parametros que se pasan por consola


// PAra el esting, la solucion es  utilizar runCommand para sumarle a los argumentes del sistema los valoers de la base que nos faltan ya que no llamamos desdec consola.
// COn esos datos ya puedo importar yarg dentro de runCommnd porque ya le va con la base. 

// expect.objectContaining se usa ya que solo me interesa ver que el objeto venga con por lo menos esas cosas.(las uso en el archivo app.ts y las renombro)
// con el console logg comentado de abajo se ve que el objeto argv tiene mas cosas que las que me interean en la APP.

// import  { yarg } from './args.plugin'


const runCommand = async( args: string[] ) => {
    process.argv = [ ...process.argv, ...args ];

    const { yarg } = await import( './args.plugin' );

    return yarg;

};

describe ('Test args.plugin.ts', () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();

    });


    test('should return default values', async ()=> {
        
        const argv = await runCommand(['-b', '5']);
        // console.log( argv );
        expect ( argv ).toEqual( expect.objectContaining ({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
        }));
        
       
    });
    test('should return configuration with custom values', async ()=> {
        
        const argv = await runCommand(['-b', '10', '-l', '20', '-s', '-n', 'custonm-name', '-d', 'custom-dir']);
        // console.log( argv );
        expect ( argv ).toEqual( expect.objectContaining ({
            b: 10,
            l: 20,
            s: true,
            n: 'custonm-name',
            d: 'custom-dir',
        }));
        
       
    });
});