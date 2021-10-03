

//elegirProductos();
    
/* Si se realiza una compra */

// if (total > 0) {

//     /* tira resumen de la misma con cada articulo, cantidad y su subtotal de cada uno. 
//     Pregunta si es correcto */

//     resumen();

//     /* si no es correcto, vuelve a iniciar la compra */

//     while (finCompra === 'n' || finCompra === 'N'){
//         totales = [];
//         resumenCompra = [];
//         elegirProductos ();
//         resumen();
//     }
    

//     let tuCompra = document.createElement('p');
//     tuCompra.className = ('tuCompra');
//     tuCompra.innerHTML = `Tu compra es de:`
//     document.getElementById('resumenCompra').appendChild(tuCompra); 

//     /* crea elementos p con resumen de la compra (de array resumenCompra) y los agrega al div id resumenCompra*/
//     for (const producto of resumenCompra) {
//         let resumen = document.createElement('p');
//         resumen.className = 'elementoResumen';
//         resumen.innerHTML = producto.slice(0, -19);
//         document.getElementById('resumenCompra').appendChild(resumen);
//     }

//     /* agrega elemento <p> con monto final de la compra */
//     let pagoFinal = document.createElement('p');
//     pagoFinal.className = 'pagoFinal';
//     pagoFinal.innerHTML = `
//     Tu pago final es de $${sumarTotales()}`;
//     document.getElementById('resumenCompra').appendChild(pagoFinal);
    
// }

mostrarProductos(productos);

let btnModo = document.getElementById('btnDark');
btnModo.onclick = () => {
  document.body.classList.toggle('dark');
  btnDark.classList.toggle('active');
}























    

















    












    














        
