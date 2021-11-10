// variables
let productos = JSON.parse(datajs);
let productos1 = 0;
let cart = [];
let i = 0;
let subtotal3 = 0;
let final = 0;


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
        <div class="prodNombreCont">
          <h3>${producto.nombre}</h3>
          <p>$${producto.precio}</p>
        </div>
        <button class='btnAgregar' id='btn${producto.id}Agregar'>+ Agregar</button>
      </div>`);
    $('#productosContainer').prepend(nuevoProducto);
  }
}

//mostrarProductos(productos)



//AGREGAR PRODUCTO AL CARRITO
const agregarProductos = (array) => {

  array.forEach((producto) => {
    $(`#btn${producto.id}Agregar`).click(() => {

      if (producto.stock === 0) {
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
        contadorCart()
      }
    })
  })
}

//agregarProductos(productos)

const eliminarConfirm = (productName) => {

  let confirmText = `
  <div class="confirm">
    <p>Esta seguro que desea eliminar este producto?</p>
    <p>${productName}</p>
    <div class=btnConfirm>
      <button id="btnSi">Sí</button>
      <button id="btnNo">No</button>
    </div>
  </div>
  `
  $('main').prepend(confirmText)

}

//ELIMINAR PRODUCTO DEL CARRITO
const eliminarProductos = () => {
  $('.carritoInner #elegidos').on('click', '.btnQuitar', (e) => {

    let nombre = e.target.previousElementSibling.firstElementChild.innerHTML;
    let precio = e.target.previousElementSibling.lastElementChild.lastElementChild.innerHTML;

    eliminarConfirm(nombre)

    $('#btnSi').click(() => {
      let subtotal2 = parseInt($('#totalNumero').html()) - precio
      $('#totalNumero').empty()
      $('#totalNumero').append(subtotal2)

      e.target.parentElement.remove();

      crearToast(nombre, precio, `eliminado del`)

      let found = cart.find(e => e.nombre === nombre)
      let index = cart.indexOf(found);
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify({ cart }))

      found.stock += 1

      if (cart.length === 0) {
        $('#cartEmpty').removeClass('hidden')
        $('#comprar').addClass('hidden');
      }

      i--
      contadorCart()

      $('.confirm').remove()
      $('.carritoInner').addClass('hidden')
    })

    $('#btnNo').click(() => {
      $('.confirm').remove()
    })

  })
}

//eliminarProductos()


// contador de productos en carrito
const contadorCart = () => {

  let numeroContador = i
  $('#contador').empty()
  $('#contador').append(numeroContador)
  $('#contador').removeClass('hidden')

  if ($('#contador').html() == 0) {
    $('#contador').addClass('hidden')
  }

}


// crear card de producto seleccionado en carrito
const cardSelected = (prod) => {
  $('.carritoInner #elegidos').append(`
            <div class="seleccionados">
              <img src="imagenes/fotoProducto${prod.id}.jpg" height="150px">
              <div class="nombreSeleccionados">
                <p>${prod.nombre}</p> 
                <div class="precioSeleccionados">
                  <p>$</p>
                  <p class="prodPrecio">${prod.precio}</p>
                </div>
              </div>
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
      subtotal3 += e.precio

      $('#cartEmpty').addClass('hidden')
      $('#comprar').removeClass('hidden');
      $('#totalNumero').empty()
      $('#totalNumero').append(subtotal3)
    })

    let numeroContador1 = local.cart.length
    $('#contador').empty()
    $('#contador').append(numeroContador1)
    $('#contador').removeClass('hidden')

    if ($('#contador').html() == 0) {
      $('#contador').addClass('hidden')

    }

    i = parseInt($('#contador').html())
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
              <a>x cerrar</a>
          </div>
        </div>`)

  $('.toastContainer').append(nuevoToast);
  setTimeout(() => {
    $(nuevoToast).remove()
  }, 3000);

  cerrarToast()
}


// CERRAR TOAST
const cerrarToast = () => {
  $('.close').click((e) => {
    let toast = e.currentTarget.parentNode
    toast.remove()
  })
}


//MOSTRAR CARRITO
$('.navCart').click(() => {
  $('.carritoInner').toggleClass('hidden')
});


//FILTRAR POR NOMBRE
const filtrarNombre = () => {
  let searchValue = $('#navBuscar').val();
  let searchLower = searchValue.toLowerCase();
  let filtrados = productos1.filter((producto) => {
    let productName = producto.nombre.toLowerCase();
    return productName.includes(searchLower);
  })

  if (filtrados.length > 0) {
    mostrarProductos(filtrados)
    agregarProductos(filtrados)
  } else { $('#productosContainer').html('<p id="noSearch"> No se encuentran productos </p>') }

}

$('#btnBuscar').on('click', filtrarNombre)
$('#navBuscar').on("keyup", filtrarNombre)


//FILTRAR POR PRECIO
const filtrarPrecio = (minimo, maximo, array) => {
  let filtrados2 = array.filter(producto => producto.precio >= minimo & producto.precio <= maximo);
  if (filtrados2.length > 0) {
    mostrarProductos(filtrados2)
    agregarProductos(filtrados2)
  } else { $('#productosContainer').html('<p id="noSearch"> No se encuentran productos </p>') }
}

const filtrarPrecioSelect = (array) => {
  $('#filterSelect').change(() => {
    if ($('.opcion1').is(':selected')) {
      filtrarPrecio(0, 5000, array)
    } else if ($('.opcion2').is(':selected')) {
      filtrarPrecio(5000, 10000, array)
    } else if ($('.opcion3').is(':selected')) {
      filtrarPrecio(10000, 15000, array)
    } else if ($('.opcion4').is(':selected')) {
      filtrarPrecio(15000, 20000, array)
    } else {
      mostrarProductos(array)
      agregarProductos(array)

    }
  })
}

//filtrarPrecioValores(productos)

//FILTRAR POR COLOR

const filtrarColor = (color, array) => {
  let filtrados3 = array.filter(producto => producto.color == color);
  if (filtrados3.length > 0) {
    mostrarProductos(filtrados3)
    agregarProductos(filtrados3)
  } else { $('#productosContainer').html('<p id="noSearch"> No se encuentran productos </p>') }

}


const filtrarColorSelect = (array) => {
  $('#filterSelect1').change(() => {
    if ($('.opcion1').is(':selected')) {
      filtrarColor('blanco', array)
    } else if ($('.opcion2').is(':selected')) {
      filtrarColor('negro', array)
    } else if ($('.opcion3').is(':selected')) {
      filtrarColor('gris', array)
    } else if ($('.opcion4').is(':selected')) {
      filtrarColor('color', array)
    } else {
      mostrarProductos(array)
      agregarProductos(array)

    }
  })
}

//FINALIZAR COMPRA
$('.btnComprar').click(() => {
  $('main').html('')
  $('.navSecciones').addClass('hidden')
  $('.carritoInner').toggleClass('hidden')

  $('main').append(`
  <div class="checkout">
    <div class="checkoutResumen">
      <div class="checkoutProductos"> </div>
      <div class="checkoutPrecioFinal"> </div>
    </div>
    <div class="checkoutInfoPago"> </div>
  </div>
  `);

  for (elemento of cart) {
    $('.checkout .checkoutProductos').append(`
    <div class="checkoutProductosCard">
      <img src="imagenes/fotoProducto${elemento.id}.jpg" height="100px">
      <div class="checkoutName">
        <p>${elemento.nombre}</p> 
        <p>$${elemento.precio}</p>
      </div>
      <button class="btnCheckoutDelete">X</div>
    </div>`)

    final += elemento.precio
  };

  $('.checkout .checkoutPrecioFinal').append(`Total: $${final}`)

  checkoutDelete()

  $('.checkout .checkoutInfoPago').append(`
  <div class="checkoutFormCont">
    <div class="checkoutForm personal">
      <p>Información personal</p>
      <label for="nombreCliente">Nombre</label>
      <input type="text" class="inputNombre" name="nombreCliente" value="Camila">
      <label for="apellidoCliente">Apellido</label>
      <input type="text" name="apellidoCliente" value="Solessio">
      <label for="emailCliente">Email</label>
      <input type="text" class="inputEmail" name="emailCliente" value="mimail@gmail.com">
      <label for="telCliente">Teléfono</label>
      <input type="numer" name="telCliente" value="11 4000 0000">
    </div>
    <div class="checkoutForm tarjeta">
      <p>Datos de la Tarjeta</p>
      <label for="numTarjeta">Tarjeta Número</label>
      <input type="text" name="numTarjeta" value="**** **** **** 1234">
      <label for="nombreTarjeta">Nombre Titular</label>
      <input type="text" name="nombreTarjeta" value="Camila Solessio">
      <label for="codigoTarjeta">CVC</label>
      <input type="text" name="codigoTarjeta" value="***">
      <label for="codigoTarjeta">Vencimiento</label>
      <input type="text" name="vencimientoTarjeta" value="10/25">
    </div>
    <button id="btnFin"> FINALIZAR COMPRA </button>
  </div>`);

  finCompra()


})

const checkoutDelete = () => {
  $('.btnCheckoutDelete').click((e) => {

    let card = e.currentTarget.parentElement
    card.remove()

    let price = e.currentTarget.previousElementSibling.lastElementChild.innerHTML
    let price2 = parseInt(price.substring(1))

    final -= price2

    $('.checkout .checkoutPrecioFinal').empty();
    $('.checkout .checkoutPrecioFinal').append(`Total: $${final}`)


    let nombre = e.currentTarget.previousElementSibling.firstElementChild.innerHTML
    let found = cart.find(e => e.nombre == nombre)
    let index = cart.indexOf(found);
    console.log(found)
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify({ cart }))

    found.stock += 1

  })
}


// BOTON FINALIZAR COMPRA
const finCompra = () => {
  $('#btnFin').click((e) => {
    e.preventDefault();
    let emailCompra = $('.inputEmail').val()
    let nombreCompra = $('.inputNombre').val()
    $('main').html('')
    $('main').append(`
    <div class="mensajeFinal">
      <div class="">Pago realizado con éxito</div>
      <div>i${nombreCompra}, gracias por tu compra!</div>
      <div>Se envió un mail a ${emailCompra} con la información sobre tu pedido</div>
      <div>Pago final: $${final}</div>
      <div>Tarjeta finalizada en **** **** **** 1234</div>
    </div>
    `)

    $('#carritoInner').html('')
    $('#contador').addClass('hidden')

    localStorage.clear()

  })
}


//MODO DARK
$('#btnDark').click(function () {
  document.body.classList.toggle('dark');
  btnDark.classList.toggle('active')
});



//-------------- tomar productos de JSON. DESAFIO 14 -----------------------------------
$.getJSON("js/data.json", function (response, state) {

  if (state === "success") {
    productos1 = response
    mostrarProductos(productos1)
    agregarProductos(productos1)
    filtrarPrecioSelect(productos1)
    filtrarColorSelect(productos1)


  }
})

eliminarProductos();
guardarCart()




































































































