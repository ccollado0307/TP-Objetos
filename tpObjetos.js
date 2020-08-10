"use strict";
exports.__esModule = true;
var fs = require("fs");
var undirender = require("undirender");
var readlineSync = require("readline-sync");
var GestorDeArchivos = /** @class */ (function () {
    function GestorDeArchivos(ubicacion) {
        var nombres = fs.readFileSync(ubicacion, 'utf8');
        this.arreglo = nombres.split('\r\n');
    }
    GestorDeArchivos.prototype.mostrarArreglo = function (arreglo) {
        console.log('El archivo de texto contiene: ', arreglo);
    };
    GestorDeArchivos.prototype.retornarArreglo = function () {
        return this.arreglo;
    };
    return GestorDeArchivos;
}());
var Persona = /** @class */ (function () {
    function Persona(apNomb, DNI) {
        this.apNomb = apNomb;
        this.DNI = DNI;
    }
    Persona.prototype.setApNomb = function (apNomb) {
        this.apNomb = apNomb;
    };
    Persona.prototype.setDNI = function (DNI) {
        this.DNI = DNI;
    };
    Persona.prototype.getApNomb = function () {
        return (this.apNomb);
    };
    Persona.prototype.getDNI = function () {
        return (this.DNI);
    };
    return Persona;
}());
var Rol = /** @class */ (function () {
    function Rol(rol, pers) {
        this.rol = rol;
        this.pers = pers;
    }
    Rol.prototype.setRol = function (rol) {
        this.rol = rol;
    };
    Rol.prototype.setPers = function (pers) {
        this.pers = pers;
    };
    Rol.prototype.getRol = function () {
        return (this.rol);
    };
    Rol.prototype.getPers = function () {
        return (this.pers);
    };
    return Rol;
}());
var Grafo = /** @class */ (function () {
    function Grafo(ancho, alto, listaAdy) {
        this.ancho = ancho;
        this.alto = alto;
        this.listaAdy = listaAdy;
    }
    Grafo.prototype.getGrafo = function () {
        var grafo = undirender(this.ancho, this.alto, this.listaAdy);
        console.log(grafo);
    };
    Grafo.prototype.setAncho = function (ancho) {
        this.ancho = ancho;
    };
    Grafo.prototype.setAlto = function (alto) {
        this.alto = alto;
    };
    Grafo.prototype.getAncho = function () {
        return this.ancho;
    };
    Grafo.prototype.getAlto = function () {
        return this.alto;
    };
    Grafo.prototype.getListaAdy = function () {
        return this.listaAdy;
    };
    return Grafo;
}());
//Esta funcion retorna el ROL de una determinada PERSONA
var buscarRol = function (pers, roles) {
    for (var i = 0; i < roles.length; i++) {
        if (roles[i].getPers().getApNomb() == pers) {
            return roles[i].getRol();
        }
    }
};
/*Esta funcion retorna la LISTA DE ADYACENCIA de ROLES. Recibe como parametro el ARREGLO DE DEPENDENCIAS
y el ARREGLO DE ROLES y crea el par de nodos para la Lista de Adyacencia.
Ej: Lista de Adyacencia = [[Gerente General,Gerente de Administracion],[Gerente General,Gerente de Ventas],...]*/
var crearListaRoles = function (arregloDep, roles) {
    var listaAdy = [];
    for (var i = 0; i < arregloDep.length; i++) {
        var arreglo = new Array();
        arreglo = arregloDep[i].split(',');
        var rol1 = buscarRol(arreglo[0], roles);
        var rol2 = buscarRol(arreglo[1], roles);
        var arregloAux = new Array();
        arregloAux.push(rol1);
        arregloAux.push(rol2);
        listaAdy.push(arregloAux);
    }
    return listaAdy;
};
/*Esta funcion retorna el ARREGLO DE ROLES.
Recibe como parametro el ARREGLO DE ROLES y el ARREGLO DE PERSONAS y con esos datos instancia la
clase PERSONA y ROL.
Por Ej:
- arregloRoles = [[Rodriguez,Gerente General],[Perez,Gerente de Administracion],]
- arregloPers = [[Rodriguez,22.456.678],[Perez, 23.456.789],....]
- arregloRoles = [[Gerente General,Rodriguez,22.456.678],[Gerente de Administracion,Perez,23.456.789]]*/
var crearArregloRoles = function (arregloRoles, arregloPers) {
    var roles = new Array();
    for (var i = 0; i < arregloPers.length; i++) {
        var arreglo = arregloPers[i].split(',');
        var arreglo1 = arregloRoles[i].split(',');
        var persona = new Persona(arreglo[0], arreglo[1]);
        var rolPers = '';
        for (var i_1 = 0; i_1 < arregloRoles.length; i_1++) {
            if (arreglo[i_1] == arreglo1[i_1]) {
                rolPers = arreglo1[1];
                i_1 = arregloRoles.length;
            }
        }
        var rol = new Rol(rolPers, persona);
        roles.push(rol);
    }
    return roles;
};
//-----------------------------------------------------------------------------------------
//Obtengo el arregloPers a partir del archivo personas.txt
var ubicacion = 'personas.txt';
var misPers = new GestorDeArchivos(ubicacion);
var arregloPers = misPers.retornarArreglo();
//Obtengo el arregloRoles a partir del archivo roles.txt
ubicacion = 'roles.txt';
var misRoles = new GestorDeArchivos(ubicacion);
var arregloRoles = misRoles.retornarArreglo();
//Obtengo el arreglo de roles = [[Gerente General,Rodriguez,22.456.678],[Gerente de Administracion,Perez,23.456.789]]
var roles = crearArregloRoles(arregloRoles, arregloPers);
//Obtengo el arregloDep a partir del archivo dependencias.txt
ubicacion = 'dependencias.txt';
var misDep = new GestorDeArchivos(ubicacion);
var arregloDep = misDep.retornarArreglo();
//Obtengo la Listas de Adyacencia
var listaAdy = crearListaRoles(arregloDep, roles);
//Indico ancho y algo del grafo no dirigido
var ancho = readlineSync.questionInt('Ingrese el ANCHO del grafo a imprimir. ');
var alto = readlineSync.questionInt('Ingrese el ALTO del grafo a imprimir. ');
//Grafico segun la Lista de Adyacencia de Roles el grafo no dirigido
var grafoImp = new Grafo(ancho, alto, listaAdy);
grafoImp.getGrafo();
