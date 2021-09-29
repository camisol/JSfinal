
/* Crear nuevos productos y agregarlos al stock (productos[]) */

class productosNuevos {
    constructor(id,nombre, precio, stock) {
        this.id = id;
        this.nombre = `Zapatillas ${nombre}`;
        this.precio = Number(precio);
        this.stock = stock;

    }

}

let sky = new productosNuevos (5, 'Oxford', 12300, 7);

productos.push(sky);
let savy = new productosNuevos (6, 'Savy', 11200, 3);

productos.push(savy);


