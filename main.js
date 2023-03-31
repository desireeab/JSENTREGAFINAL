let productos= [];

fetch("./productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");

let arrayCarrito ;

let arrayCarritoLS = localStorage.getItem("productos-en-carrito")

if (arrayCarritoLS) {
    arrayCarrito = JSON.parse(arrayCarritoLS);
} else {
    arrayCarrito = [];
}

function cargarProductos(listaProductos) {

    contenedorProductos.innerHTML = "";

    listaProductos.forEach (e => {
        let card = document.createElement("div")
        card.classList.add("productos")
        card.innerHTML = `<div class="card" style="width: 18rem;">
                            <img src="./img/${e.imagen}" class="card-img-top" alt="${e.nombre}">
                            <div class="card-body">
                            <h5 class="card-title">${e.nombre}</h5>
                            <p class="card-text">Compralo por $${e.precio}</p>
                            <input type="button" onclick="agregaAlCarrito(${e.id})" class="btn btn-info" value="Agregar al 🛒">
                            </div>
                        </div>`
        contenedorProductos.append(card);})
}

class ObjCarrito{
    constructor(producto, cant){
        this.producto = producto;
        this.cantidad = cant;
    }
    sumaStock(){
        this.cantidad = this.cantidad + 1
    }
}

function agregaAlCarrito(prod){

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right", 
        stopOnFocus: true, 
        destination: "./carrito.html",
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem',
            y: '1.5rem'
          },
        onClick: function(){}
      }).showToast();

    let existeEnCarrito = arrayCarrito.find(e => e.producto == prod);
    if(existeEnCarrito != undefined){
        let posicion = arrayCarrito.findIndex(elem => elem.producto == existeEnCarrito.producto);
        arrayCarrito[posicion].sumaStock()
            
        console.table(arrayCarrito)
    }else{
        const prodCarrito = new ObjCarrito (prod, 1);
        arrayCarrito.push(prodCarrito);
        console.table(arrayCarrito);
    }
    localStorage.setItem("productos-en-carrito", JSON.stringify(arrayCarrito))
}