
// const message: string = 'Hola mundo'

// console.log( message );


import fs from 'fs'
import { yarg } from "./config/plugins/args.plugin"

console.log(yarg);

const {b:base, l:limit, s:showTable} = yarg;

console.log(base);

let outputmessage = '';
// const base = yarg.b;
const headerMeassage:string = `

---------------------------------------------
             Tabla del ${base}
---------------------------------------------\n
`;


for(let i =1; i <= limit; i++){
    outputmessage += `${base} x ${i} = ${base * i}\n`;
}

outputmessage = headerMeassage + outputmessage

if  (showTable) {
    console.log(outputmessage);
    
}


const outputPath = 'outputs/folder 1';

fs.mkdirSync(outputPath, { recursive : true });
fs.writeFileSync(`${ outputPath }/tabla-${base}.txt`, outputmessage);
console.log('File created');
