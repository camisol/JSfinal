// variables
let productos = JSON.parse(data);
let cart = [];
let i = 0;


//OBJETOS
//producto 
class productosNuevos {
  constructor(id, nombre, precio, stock) {
    this.id = id;
    this.nombre = `Zapatillas ${nombre}`;
    this.precio = Number(precio);
    this.stock = stock;
  }
}


//MODO DARK
$('#btnDark').click(function () {
  document.body.classList.toggle('dark');
  btnDark.classList.toggle('active')
});


//FILTRAR POR NOMBRE
const filtrarNombre = () => {
  let searchValue = $('#navBuscar').val()
  let filtrados = productos.filter((producto) => {
    let productName = producto.nombre.toLowerCase();
    return productName.includes(searchValue.toLowerCase())
  })

  if (filtrados.length > 0) {
    mostrarProductos(filtrados)
    agregarProductos(filtrados)
  } else { $('#productosContainer').html('<p id="noSearch"> No se encuentran productos </p>') }
}
$('#btnBuscar').on('click', filtrarNombre)
$('#navBuscar').on("keyup", filtrarNombre)


//FILTRAR POR PRECIO
const filtrar = (minimo, maximo) => {
  let filtrados2 = productos.filter(producto => producto.precio > minimo & producto.precio < maximo);
  if (filtrados2.length > 0) {
    mostrarProductos(filtrados2)
    agregarProductos(filtrados2)
  } else { $('#productosContainer').html('<p id="noSearch"> No se encuentran productos </p>') }
}

$('#filterSelect').change(() => {
  if ($('.opcion1').is(':selected')) {
    filtrar(0, 5000)
  } else if ($('.opcion2').is(':selected')) {
    filtrar(5000, 10000)
  } else if ($('.opcion3').is(':selected')) {
    filtrar(10000, 15000)
  } else if ($('.opcion4').is(':selected')) {
    filtrar(15000)
  } else {
    mostrarProductos(productos)
    agregarProductos(productos)

  }
});


//DIBUJAR PRODUCTOS
const mostrarProductos = (array) => {
  $('#productosContainer').html('')
  for (const producto of array) {
    let nuevoProducto = $(`
      <div class="productos" id="producto${producto.id}">
        <img class='fotoProducto' src='imagenes/fotoProducto${producto.id}.jpg'>
        <h3> ${producto.nombre}</h3>
        <p> $${producto.precio}</p>
        <button class='btnAgregar' id='btn${producto.id}Agregar'>agregar</button>
      </div>`);
    $('#productosContainer').prepend(nuevoProducto);
  }
}

mostrarProductos(productos);


//MOSTRAR CARRITO
$('.navCart').click(() => {
  $('.carritoInner').toggleClass('noMostrar')
});


//AGREGAR PRODUCTO AL CARRITO
const agregarProductos = (array) => {
  array.forEach((producto) => {
    $(`#btn${producto.id}Agregar`).click((e) => {

      if (producto.stock <= 0) {
        alert('No hay más stock de este producto');
      } else {

        animacion()
        $('#cartEmpty').addClass('hidden')
        $('#comprar').removeClass('hidden');
        producto.stock -= 1;

        sessionStorage.clear();
        JSON.parse(sessionStorage.getItem(cart));
        cart.push(producto);
        sessionStorage.setItem(cart, JSON.stringify({ cart }));

        crearToast(`${cart[i].nombre}`, `${cart[i].precio}`, `agregado al`);

        $('.carritoInner #elegidos').append(`
            <div class="seleccionados">
              <img src="imagenes/fotoProducto${cart[i].id}.jpg" height="200px">
              <p> ${cart[i].nombre}</p> 
              <p class="prodPrecio">${cart[i].precio}</p>
              <a class="btnQuitar">x</a>
            </div>`)

        let subtotal1 = parseInt($('#totalNumero').html()) + cart[i].precio
        $('#totalNumero').empty()
        $('#totalNumero').append(subtotal1)

        i++

        // sessionStorage.clear();
        // JSON.parse(sessionStorage.getItem(cart));
        // cart.push(producto);
        // sessionStorage.setItem(cart, JSON.stringify({ cart }));

        // $('.carritoInner #elegidos').append(`
        //      <div class="seleccionados">
        //       <img src="imagenes/fotoProducto${producto.id}.jpg" height="200px">
        //       <p> ${producto.nombre}</p> 
        //       <p class="prodPrecio">${producto.precio}</p>
        //        <a class="btnQuitar">x</a>
        //     </div>`)

        // let subtotal1 = parseInt($('#totalNumero').html()) + producto.precio
        // $('#totalNumero').empty()
        // $('#totalNumero').append(subtotal1)
      }
    })
  })
}
agregarProductos(productos);



//ELIMINAR PRODUCTO DEL CARRITO
const eliminarProductos = () => {
  $('.carritoInner #elegidos').on('click', '.btnQuitar', (e) => {

    let nombre = e.target.previousElementSibling.previousElementSibling.innerHTML;
    let precio = e.target.previousElementSibling.innerHTML;
    let subtotal2 = parseInt($('#totalNumero').html()) - precio
    $('#totalNumero').empty()
    $('#totalNumero').append(subtotal2)

    e.target.parentElement.remove();

    crearToast(nombre, precio, `eliminado del`)

    for (elementos of cart) {
      if (elementos.precio == precio) {
        let index = cart.indexOf(elementos);
        cart.splice(index, 1);
        sessionStorage.clear()
        sessionStorage.setItem(cart, JSON.stringify({ cart }))
        i--

        if (cart.length === 0) {
          $('#cartEmpty').removeClass('hidden')
          $('#comprar').addClass('hidden');
        }
      }
    }

  })
}

eliminarProductos();


// CREAR AVISO POR PRODUCTO AGREGADO O ELIMINADO DEL CARRITO
const crearToast = (nombre, precio, texto) => {
  let nuevoToast = $(`
        <div class="toastBox">
          <div class="toastInner">
              <p>Producto  ${texto}  carrito: </p>
              <p> ${nombre} </p>
              <p> $${precio} </p>
          </div>
          <div class="close">
              <a>x</a>
          </div>
      </div>`)

  $('.toastContainer').append(nuevoToast);
  setTimeout(() => {
    $(nuevoToast).remove()
  }, 4000);
}


//FINALIZAR COMPRA
const finalizarCompra = () => {
  $('.btnComprar').click(() => {
    $('#mensajeFinal').append(`<p>Gracias por tu compra!</p>`);
    sessionStorage.clear()
  })
};

finalizarCompra();

//ANIMACION CARRITO - DESAFIO 13
const animacion = () => {
  $('.navCart').slideUp()
    .slideDown()
}



































































































































