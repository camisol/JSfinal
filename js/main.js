// variables
let productos = JSON.parse(datajs);
let cart = [];
let i = 0;
let subtotal2 = 0;


//OBJETO
//producto 
class productosNuevos {
  constructor(id, nombre, precio, stock) {
    this.id = id;
    this.nombre = `Zapatillas ${nombre}`;
    this.precio = Number(precio);
    this.stock = stock;
  }
}


//MOSTRAR PRODUCTOS
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


//AGREGAR PRODUCTO AL CARRITO
const agregarProductos = (array) => {

  array.forEach((producto) => {
    $(`#btn${producto.id}Agregar`).click(() => {

      if (producto.stock <= 0) {
        alert('No hay más stock de este producto');
      } else {

        $('#cartEmpty').addClass('hidden')
        $('#comprar').removeClass('hidden');
        producto.stock -= 1;

        cart.push(producto);
        localStorage.setItem('cart', JSON.stringify({ cart }));

        crearToast(`${producto.nombre}`, `${producto.precio}`, `agregado al`);

        cardSelected(producto)

        let subtotal1 = parseInt($('#totalNumero').html()) + producto.precio
        $('#totalNumero').empty()
        $('#totalNumero').append(subtotal1)

        i++
      }
    })
  })
}


//ELIMINAR PRODUCTO DEL CARRITO
const eliminarProductos = () => {
  $('.carritoInner #elegidos').on('click', '.btnQuitar', (e) => {

    let nombre = e.target.previousElementSibling.previousElementSibling.innerHTML;
    let precio = e.target.previousElementSibling.innerHTML;
    let subtotal3 = parseInt($('#totalNumero').html()) - precio
    $('#totalNumero').empty()
    $('#totalNumero').append(subtotal3)

    e.target.parentElement.remove();

    crearToast(nombre, precio, `eliminado del`)
    cerrarToast()

    for (elementos of cart) {
      if (elementos.precio == precio) {
        let index = cart.indexOf(elementos);
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify({ cart }))
        i--

        if (cart.length === 0) {
          $('#cartEmpty').removeClass('hidden')
          $('#comprar').addClass('hidden');
        }
      }
    }
  })
}


// crear card de producto seleccionado en carrito
const cardSelected = (prod) => {
  $('.carritoInner #elegidos').append(`
            <div class="seleccionados">
              <img src="imagenes/fotoProducto${prod.id}.jpg" height="200px">
              <p> ${prod.nombre}</p> 
              <p class="prodPrecio">${prod.precio}</p>
              <a class="btnQuitar">x</a>
            </div>`)

}


// conservar carrito cuando se actualiza la página
const guardarCart = () => {
  let local = JSON.parse(localStorage.getItem('cart'));
  if ($('#elegidos').is(':empty') || local.cart > 0) {

    local.cart.forEach((e) => {
      cardSelected(e)
      cart.push(e)
      subtotal2 += e.precio

      $('#cartEmpty').addClass('hidden')
      $('#comprar').removeClass('hidden');
      $('#totalNumero').empty()
      $('#totalNumero').append(subtotal2)
    })
  }
}


// CREAR TOAST POR PRODUCTO AGREGADO O ELIMINADO DEL CARRITO
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

  cerrarToast()
}

// CERRAR TOAST
const cerrarToast = () => {
  $('.close').click((e) => {
    let toast = e.currentTarget.parentNode
    toast.remove()
  })
}


//FILTRAR POR NOMBRE
// const filtrarNombre = () => {
//   let searchValue = $('#navBuscar').val()
//   let filtrados = (productos).filter((producto) => {

//     let productName = producto.nombre.toLowerCase()
//     return productName.includes(searchValue.toLowerCase())
//   })

//   if (filtrados.length > 0) {
//     mostrarProductos(filtrados)
//     agregarProductos(filtrados)
//   } else { $('#productosContainer').html('<p id="noSearch"> No se encuentran productos </p>') }

// }
// $('#btnBuscar').on('click', filtrarNombre)
// $('#navBuscar').on("keyup", filtrarNombre)



//FILTRAR POR PRECIO
const filtrarPrecio = (minimo, maximo, array) => {
  let filtrados2 = array.filter(producto => producto.precio > minimo & producto.precio < maximo);
  if (filtrados2.length > 0) {
    mostrarProductos(filtrados2)
    agregarProductos(filtrados2)
  } else { $('#productosContainer').html('<p id="noSearch"> No se encuentran productos </p>') }
}

const filtrarPrecioValores = (array) => {
  $('#filterSelect').change(() => {
    if ($('.opcion1').is(':selected')) {
      filtrarPrecio(0, 5000, array)
    } else if ($('.opcion2').is(':selected')) {
      filtrarPrecio(5000, 10000, array)
    } else if ($('.opcion3').is(':selected')) {
      filtrarPrecio(10000, 15000, array)
    } else if ($('.opcion4').is(':selected')) {
      filtrarPrecio(15000)
    } else {
      mostrarProductos(array)
      agregarProductos(array)

    }
  })
}

//MOSTRAR CARRITO
$('.navCart').click(() => {
  $('.carritoInner').toggleClass('hidden')
});

//FINALIZAR COMPRA
$('.btnComprar').click(() => {
  $('main').html('')
  $('.navSecciones').addClass('hidden')
  $('main').append(`<p>PAGINA DE PAGO</p>`);
  $('.carritoInner').toggleClass('hidden')
  localStorage.clear()
})


//MODO DARK
$('#btnDark').click(function () {
  document.body.classList.toggle('dark');
  btnDark.classList.toggle('active')
});


//-------------- tomar productos de JSON. DESAFIO 14 -----------------------------------
$.getJSON("js/data.json", function (response, state) {

  if (state === "success") {
    let productos1 = response
    mostrarProductos(productos1)
    agregarProductos(productos1)
    filtrarPrecioValores(productos1)

    const filtrarNombre = () => {
      let searchValue = $('#navBuscar').val()
      let filtrados = productos1.filter((producto) => {

        let productName = producto.nombre.toLowerCase()
        return productName.includes(searchValue.toLowerCase())
      })

      if (filtrados.length > 0) {
        mostrarProductos(filtrados)
        agregarProductos(filtrados)
      } else { $('#productosContainer').html('<p id="noSearch"> No se encuentran productos </p>') }

    }
    $('#btnBuscar').on('click', filtrarNombre)
    $('#navBuscar').on("keyup", filtrarNombre)
  }
})

eliminarProductos();
guardarCart()












































































































