# TP-Objetos
Repositorio para la Entrega del TP-Objetos

La libreria utilizada es "undirender".
Esta libreria recibe como parametro ANCHO, ALTO y LISTA DE ADYACENCIA. 
El ANCHO y ALTO es un numero entero. 
La LISTA es un arreglo de NODOS DE ADYACENCIA, como por ejemplo, [['a','b'], ['a','c'], ['a','d'],....]
Este libreria permite graficar o describir un grafico no dirigido segun la lista de adyacencia. 
Devuelve una cadena de filas de ancho por columnas de alto que representa el grafico.

Este proyecto permite graficar a traves de la libreria los nodos de adyacencia los ROLES de PERSONAS dentro de una Empresa. 
El mismo contiene: 
- la CLASE GestorDeArchivos, que permite manipular los archivos de texto de Personas, Roles y Dependencias. 
- la CLASE Persona, que como su nombre lo indica, instancia a las Personas de la Empresa. 
- la CLASE Rol, que instancia a los Roles de Personas dentro de la Empresa. 
- la CLASE Grafo, que permite manipular la libreria undirender. 

Ejemplo del Proyecto:
    La Empresa cuenta con el Personal que se detalla:
    - Rodriguez Juan Ignacio con DNI 22.671.699 es el Gerente General. 
    - Perez Marcos con DNI 23.456.789 es el Gerente de Ventas. 
    - Gonzalez Valentina con DNI 45.678.543 es el Gerente de Compras. 
    - ...
 
El archivo personas.txt indican los datos Rodriguez Juan Ignacio,22.671.699;Perez, 23.456.789, ...
El archivo roles.txt indica los roles de la Persona dentro de la Empresa Rodriguez Juan Ignacio,Gerente General;Gonzalez Valentina,Gerente de Ventas;...

Con ambos archivos a traves de la funcion crearArregloRoles creo el arreglo de Roles. 
[[Gerente General,Rodriguez Juan Ignacio,22.671.699],[Gerente de Ventas,Perez Marcos,23.456.789]]

Con el arreglo de Roles y el archivo dependencias.txt creo la Lista de Adyacencia. 
Perez Marcos y Gonzales Valentina dependen de Rodriguez Juan Ignacio; por lo tanto los roles, estarian dado por [[Rodriguez Juan Ignacio,Perez Marcos],[Rodriguez Juan Ignacio,Gonzalez Valentina], ....]. 
Indicando un Alto, Ancho y la Lista de Adayancenia instancio un Objeto de la Clase Grafo y muestro por pantalla el grafo no dirigido