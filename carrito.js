
let arrayCarrito = localStorage.getItem("productos-en-carrito");
console.log(arrayCarrito)
arrayCarrito = JSON.parse(arrayCarrito);
console.log(arrayCarrito)


const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito() {

    contenedorCarritoProductos.innerHTML = "";

    
        arrayCarrito.forEach (e => {
            let card = document.createElement("div")
            card.classList.add("productos")
            card.innerHTML = `<div class="card" style="width: 18rem;">
                                <div class="card-body">
                                <h5 class="card-title">${e.nombre}</h5>
                                <p class="card-text">Seleccionaste ${e.cantidad}</p>
                                </div>
                            </div>`
            contenedorCarritoProductos.append(card);
    })
    actualizarTotal();
}

cargarProductosCarrito();

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${arrayCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            arrayCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(arrayCarrito));
            cargarProductosCarrito();
        }
      })
}

function actualizarTotal() {
    const totalCalculado = arrayCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    arrayCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(arrayCarrito));
}
