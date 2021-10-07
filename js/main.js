let productos = JSON.parse(data);
let i =0;
let suma = 0;

//OBJETOS
//producto 
class productosNuevos {
  constructor(id,nombre, precio, stock) {
      this.id = id;
      this.nombre = `Zapatillas ${nombre}`;
      this.precio = Number(precio);
      this.stock = stock;}}

//FUNCIONES

const mostrarProductos = (array) => {
    
  for (const producto of array) {
      let nuevoProducto = $(`
      <div class="productos" id="producto${producto.id}">
        <img class='fotoProducto' src='imagenes/fotoProducto${producto.id}.jpg'>
        <h3> ${producto.nombre}</h3>
        <p> $${producto.precio}</p>
        <button class='btnAgregar' id='btn${producto.id}Agregar'>agregar</button>
      </div>`);
      $('#productosContainer').prepend(nuevoProducto);}}

//agregar productos al carrito y mostrarlos
const agregarProductos = () => {

  productos.forEach((producto)=>{
    $(`#btn${producto.id}Agregar`).click(function () {
      
      if (producto.stock<=0){
        alert('No hay más stock de este producto');
      }else{

        $('#resumenCompra').show();
        producto.stock -= 1;

        i++
        for (const elemento of productos) {
          if (elemento.id === producto.id) {
            sessionStorage.setItem(`producto${i}`, JSON.stringify({producto}))
            let get = JSON.parse(sessionStorage.getItem(`producto${i}`));
            $(`<p class='p' id='p'> 1 ${get.producto.nombre} por $${get.producto.precio} agregado al carrito</p>`).insertBefore('#resumenCompra')

            $('#totalCompra').empty()
            suma += get.producto.precio
            mostrar = $('#totalCompra').append(`Tu compra es de $${suma}`);
          }
        }
      }
    }) 
  })
}

//finalizar la compra 
const finalizarCompra = () => {
  $('.btnCompra').click(function (){
    $('#mensajeFinal').append(`<p>Gracias por tu compra!</p>`);
    $('#cart').remove();
    sessionStorage.clear();
  })
}

//modo dark
$('#btnDark').click(function (){
document.body.classList.toggle('dark');
btnDark.classList.toggle('active');
})

//LLAMAR FUNCIONES
$('#resumenCompra').hide();
mostrarProductos(productos);
agregarProductos();
finalizarCompra();



























































    

















    












    














        
