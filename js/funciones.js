
/* funcion para q el usuario ingrese los productos y la cantidad deseada */

let continuarCompra;

const elegirProductos = () => {
do{

    let productoElegido = seleccionProd(); 
    
    /* si ingresa la ultima opcion 'temrinar' se corta */

    if(productoElegido === productos.length + 1){
        break;}

    /* si no continua la compra con la cantidad */    

    let cantidad = parseInt(prompt(`Ingrese la cantidad deseada`));
    
    agregar(productoElegido,cantidad);
    
    continuarCompra = prompt('Desea agregar mas productos? S/N');
    
} while (continuarCompra ==='S' || continuarCompra === 's' );}

/* Funcion para generar catalogo dinamico y que usuario seleccione
producto deseado por prompt. Devuelve el numero que corresponde al producto elegido */


const seleccionProd = () => {
    let listaProd = 'Seleccione el producto deseado: \n';
    for (items of productos){
        listaProd += items.id + '-' + items.nombre + '\n';
    }
    // productos.forEach((elementos) => {
    //     listaProd = listaProd + elementos.id + '-' + elementos.nombre + '\n';
    // })
     listaProd += (productos.length + 1) + '- Terminar';
     return parseInt(prompt(listaProd));
}

/* Funcion para agregar el producto elegido y la cantidad al carrito.
Despues pushea el subtotal de cada producto elegido a totales[],
y el string descripcion de cada producto elegido a resumenCompra[] */

let total;
let prodAgregado;

const agregar = (productoElegido, cantidad) => {
    let buscado = productos.find(elementos => elementos.id === productoElegido);
    total = cantidad * buscado.precio;
    prodAgregado = `${cantidad} ${buscado.nombre} por $${total} agregado al carrito`;
    resumenCompra.push(prodAgregado);
    totales.push(total);
    return alert(prodAgregado);
}

/* tirar alert con resumen de la compra antes de finalizar 
y preguntar si es correcto */

let alertResumen;
let finCompra;

const resumen = ()=> {
    
    alertResumen = 'Vas a llevar:  \n';
    resumenCompra.forEach((elemento) => {
        alertResumen += elemento.slice(0, -19) + '\n';
    })
    alertResumen += `Es correcto? S/N`;
    finCompra =  prompt(alertResumen);
    return finCompra;
}


/* sumar el array de subtotales y
calcular valor final de la compra */

const sumarTotales = () => {
    let suma = 0;
    totales.forEach((elementos) => {
        suma += elementos;
    })
    return suma;
}


/* odenar de manera ascendente segun precio PARA DESAFIO COMPLEMENTARIO */
const ordenar = (array) => {
    
    let ordenados = array.sort((a,b) => a.precio - b.precio);
    let listaOrdenados = 'Productos de menor a mayor precio \n';
    for (elementos of ordenados) {
        listaOrdenados += elementos.nombre + ' ' + elementos.precio + '\n';
    }
    return listaOrdenados;
}

/* crear div con cada producto con clase 'productos' y agregarlos a DOM a id prodcutosContainer */

const mostrarProductos = (array) => {
    
    for (const producto of array) {
        let contenedor = document.createElement('div');
        contenedor.className = "productos";
        contenedor.innerHTML = 
        `<h3> ${producto.nombre}</h3>
        <p> $${producto.precio}</p>`;
        document.getElementById('productosContainer').appendChild(contenedor);
    }
}

