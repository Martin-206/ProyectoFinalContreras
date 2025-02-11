let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let carritoBody = document.getElementById("carrito-body");
let totalElement = document.getElementById("total");


function verCarrito() {
    //poner en 0 la pagina
    carritoBody.innerHTML = "";
    let total = 0;
    //armar el carrito
    carrito.forEach((producto, indice) => {
        let fila = document.createElement("tr");

        let subtotal =   producto.precio * producto.cantidad;
        total += subtotal;
        //armar el carrito usando bootstrap con estilos usados en el curso de css
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>
                <button id="restar-${indice}" class="btn btn-sm btn-outline-secondary">-</button>
                <span id="cantidad-${indice}">${producto.cantidad}</span>
                <button id="sumar-${indice}" class="btn btn-sm btn-outline-secondary">+</button>
            </td>
            <td id="subtotal-${indice}">$${subtotal}</td>
            <td><button id="eliminar-${indice}" class="btn btn-danger">X</button></td>
        `;

        carritoBody.appendChild(fila);

        // funciones de los botones
        document.getElementById(`sumar-${indice}`).onclick = () => sumarProducto(indice);
        document.getElementById(`restar-${indice}`).onclick = () => restarProducto(indice);
        document.getElementById(`eliminar-${indice}`).onclick = () => eliminarProducto(indice);
    });

    totalElement.innerText = total.toFixed(2);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// funcion para sumar un producto
function sumarProducto(indice) {
    carrito[indice].cantidad++;
    document.getElementById(`cantidad-${indice}`).innerText = carrito[indice].cantidad;//sumo un elemento segun el indice
    verCarrito();
}
// restar producto o eliminar si la cantidad es 1
function restarProducto(indice) {
    let producto = carrito[indice];

    if (producto.cantidad > 1) {
        producto.cantidad--;
    } else {
        carrito = carrito.filter((item, i) => i !== indice);
    }

    verCarrito();
}

// Quitar producto  del carrito
function eliminarProducto(indice) {
    carrito = carrito.filter((item, i) => i !== indice);
    verCarrito();
}


// vaciar el carrito
document.getElementById("vaciar-carrito").addEventListener("click", () => {
    Swal.fire({
        title: "Estas seguro que desea borrar el carrito?",
        text: "Ya no podras recuperarlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, vaciar el carrito!"
        }).then((result) => {
        if (result.isConfirmed) {
        carrito = [];
        verCarrito();
        Swal.fire({
            title: "Borrado!",
            text: "carrito vacio.",
            icon: "success"
        });
        }
    });
    
});


verCarrito();
