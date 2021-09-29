    
/* productos iniciales disponibles */

let productos = [
    {id: 1, nombre:'Zapatillas Black', precio: 10000, stock: 20},
    {id: 2, nombre:'Zapatillas Air', precio: 10500, stock: 10},
    {id: 3, nombre:'Zapatillas Rainbow', precio: 9000, stock: 15},
    {id: 4, nombre:'Zapatillas Space', precio: 8500, stock: 5} ];

/* va guardando el subtotal de cada producto elegido.
Se pushean desde la funcion agregar() */

let totales = [];

/* guarda string descripcion de los productos elegidos para 
tirar en el resumen de la compra (funcion resumen()).
Se pushea desde la funcion agregar() */

let resumenCompra = [];