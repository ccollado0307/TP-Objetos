import * as fs from 'fs';
import * as undirender from 'undirender';
import * as readlineSync from 'readline-sync'

class GestorDeArchivos {
    private ubicacion: string;
    private arreglo: Array<string>;
    
    constructor(ubicacion: string) { 
        let nombres: string = fs.readFileSync(ubicacion, 'utf8');
        this.arreglo = nombres.split('\r\n');
    } 

    public mostrarArreglo (arreglo: Array<string>): void {
        console.log('El archivo de texto contiene: ', arreglo);
    }

    public retornarArreglo (): Array<string> {
        return this.arreglo;
    }
}

class Persona {
    private apNomb: string;
    private DNI: string; 
    
    constructor(apNomb:string, DNI: string) { 
        this.apNomb = apNomb;
        this.DNI = DNI;
    } 

    public setApNomb (apNomb: string): void {
        this.apNomb = apNomb;
    }

    public setDNI (DNI: string): void {
        this.DNI = DNI;
    }

    public getApNomb (): string {
        return(this.apNomb);
    }

    public getDNI (): string {
        return(this.DNI);
    }
}

class Rol {
    private rol: string;
    private pers: Persona;
    
    constructor(rol: string, pers:Persona) { 
        this.rol = rol;
        this.pers = pers;
    } 
    
    public setRol (rol: string): void {
        this.rol = rol;
    }

    public setPers (pers: Persona): void {
        this.pers = pers;
    }

    public getRol (): string {
        return(this.rol);
    }

    public getPers (): Persona {
        return(this.pers);
    }
}

class Grafo {
    private ancho: number;
    private alto: number;
    private listaAdy: Array<Array<string>>;
    
    constructor(ancho: number, alto: number, listaAdy: Array<Array<string>>) { 
        this.ancho = ancho;
        this.alto = alto;
        this.listaAdy = listaAdy;
    } 

    public getGrafo (): void {
        let grafo = undirender(this.ancho, this.alto, this.listaAdy);
        console.log(grafo);
    }

    public setAncho (ancho: number): void {
        this.ancho = ancho;
    }

    public setAlto(alto: number): void {
        this.alto = alto;
    }

    public getAncho (): number {
        return this.ancho;
    }

    public getAlto (): number {
        return this.alto;
    }

    public getListaAdy (): Array<Array<string>> {
        return this.listaAdy;
    }
}

//Esta funcion retorna el ROL de una determinada PERSONA
let buscarRol = (pers: string,roles: Array<Rol>): string => {
    for (let i: number = 0; i < roles.length; i++) {
        if (roles[i].getPers().getApNomb() == pers) { 
            return roles[i].getRol();
        }
    }
}

/*Esta funcion retorna la LISTA DE ADYACENCIA de ROLES. Recibe como parametro el ARREGLO DE DEPENDENCIAS
y el ARREGLO DE ROLES y crea el par de nodos para la Lista de Adyacencia. 
Ej: Lista de Adyacencia = [[Gerente General,Gerente de Administracion],[Gerente General,Gerente de Ventas],...]*/
let crearListaRoles = (arregloDep: Array<string>,roles: Array<Rol>): Array<Array<string>> => {
    let listaAdy: Array<Array<string>> = [];

    for (let i: number = 0; i < arregloDep.length; i++) {
        let arreglo: Array<string> = new Array();
        arreglo = arregloDep[i].split(',');

        let rol1 = buscarRol(arreglo[0],roles); 
        let rol2 = buscarRol(arreglo[1],roles);

        let arregloAux: Array<string> = new Array();
        arregloAux.push(rol1);
        arregloAux.push(rol2); 
        listaAdy.push(arregloAux); 
    }
    return listaAdy;
}

/*Esta funcion retorna el ARREGLO DE ROLES. 
Recibe como parametro el ARREGLO DE ROLES y el ARREGLO DE PERSONAS y con esos datos instancia la 
clase PERSONA y ROL.
Por Ej: 
- arregloRoles = [[Rodriguez,Gerente General],[Perez,Gerente de Administracion],]
- arregloPers = [[Rodriguez,22.456.678],[Perez, 23.456.789],....]
- arregloRoles = [[Gerente General,Rodriguez,22.456.678],[Gerente de Administracion,Perez,23.456.789]]*/
let crearArregloRoles = (arregloRoles: Array<string>,arregloPers: Array<string>): Array<Rol> => {
    let roles: Array<Rol> = new Array();

    for (let i: number = 0; i < arregloPers.length; i++) {
        let arreglo: Array<string> = arregloPers[i].split(','); 
        let arreglo1: Array<string> = arregloRoles[i].split(',');  

        let persona = new Persona (arreglo[0],arreglo[1]);
        
        let rolPers: string = '';

        for (let i: number = 0; i < arregloRoles.length; i++) {
            if (arreglo[i] == arreglo1[i]) { 
                rolPers = arreglo1[1];
                i = arregloRoles.length;
            }
        }
        
        let rol = new Rol(rolPers,persona);
        roles.push(rol);
    }
    return roles;
}
//-----------------------------------------------------------------------------------------

//Obtengo el arregloPers a partir del archivo personas.txt
let ubicacion: string = 'personas.txt';
let misPers = new GestorDeArchivos(ubicacion);
let arregloPers: Array<string> = misPers.retornarArreglo();

//Obtengo el arregloRoles a partir del archivo roles.txt
ubicacion = 'roles.txt';
let misRoles = new GestorDeArchivos(ubicacion);
let arregloRoles: Array<string> = misRoles.retornarArreglo();

//Obtengo el arreglo de roles = [[Gerente General,Rodriguez,22.456.678],[Gerente de Administracion,Perez,23.456.789]]
let roles: Array<Rol> = crearArregloRoles(arregloRoles,arregloPers)

//Obtengo el arregloDep a partir del archivo dependencias.txt
ubicacion = 'dependencias.txt';
let misDep = new GestorDeArchivos(ubicacion);
let arregloDep: Array<string> = misDep.retornarArreglo();

//Obtengo la Listas de Adyacencia
let listaAdy: Array<Array<string>> = crearListaRoles(arregloDep,roles);

//Indico ancho y algo del grafo no dirigido
let ancho = readlineSync.questionInt('Ingrese el ANCHO del grafo a imprimir. ');
let alto = readlineSync.questionInt('Ingrese el ALTO del grafo a imprimir. ');

//Grafico segun la Lista de Adyacencia de Roles el grafo no dirigido
let grafoImp = new Grafo(ancho, alto, listaAdy);
grafoImp.getGrafo();