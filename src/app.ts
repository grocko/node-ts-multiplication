
import { yarg } from "./config/plugins/args.plugin"
import { ServerApp } from "./presentation/server-app"

// console.log(process.argv);

// console.log(yarg)

// console.log(yarg.b);


//--------------------------------
//Funciones anonimas autoconvocas:
// Por defencto todo el codigo que esta dentro de APP tiene que ser sincrono, eso muy bien no lo entendi.
// Se envuelve en tre parentesis la fucion anonima y seuido se abra y cierra parentesis.
// Es una manera de invocarla, pero como es anonima se hace de esa manera ya que no tienen nombre
// la funcion puede ser asincrona si se le one async adelantre

// (async() => {
//     await main();
//     console.log('Fin de programa');
// })();


// async function main() {
//     console.log('Main ejecutando');
    
// };

//----------------------------------


(async() => {
    await main();
})();


async function main() {

    const {b:base, l:limit, s:showTable, n:filename, d:fileDestination} = yarg;
    
    ServerApp.run({ base, limit, showTable, filename, fileDestination });
    
};