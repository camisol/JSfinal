//OBJETOS

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
let raven = new productosNuevos(7,'Raven',9500,5);
productos.push(raven);


//FUNCIONES


//mostrar productos por dom

const mostrarProductos = (array) => {
    
  for (const producto of array) {
      
      let nuevoProducto = $(`
      <div class="productos" id="producto${producto.id}">
        <img class='fotoProducto' src='imagenes/fotoProducto${producto.id}.jpeg'>
        <h3> ${producto.nombre}</h3>
        <p> $${producto.precio}</p>
        <button class='btnAgregar' id='btn${producto.id}Agregar'>agregar</button>
      </div>`);
      $('#productosContainer').prepend(nuevoProducto);
  }
}

//agregar productos al carrito y mostrarlos en dom 

const agregarProductos = () => {
  productos.forEach((producto)=>{
      $(`#btn${producto.id}Agregar`).click(function () {
          $(`<p class='p' id='p'> 1 ${producto.nombre} por $${producto.precio} agregado al carrito</p>`).insertBefore('#resumenCompra')
          
          $('#resumenCompra').show();

          cart.push(producto.precio);

          let suma = 0;
          let mostrar = 0;

          $('#totalCompra').empty()

          cart.forEach((elementos)=> {
              suma += elementos;
          })
          mostrar = $('#totalCompra').append(`Tu compra es de $${suma}`);
          return mostrar
      });
  })
}

//boton para finalizar la compra 
const finalizarCompra = () => {
  $('.btnCompra').click(function (){
    $('#mensajeFinal').append(`<p>Gracias por tu compra!</p>`);
    $('#cart').remove();
  })
}

//BOTON MODO DARK
$('#btnDark').click(function (){
document.body.classList.toggle('dark');
btnDark.classList.toggle('active');
})


//LLAMAR FUNCIONES//

$('#resumenCompra').hide();

mostrarProductos(productos);
agregarProductos();
finalizarCompra();

























































    

















    












    














        
