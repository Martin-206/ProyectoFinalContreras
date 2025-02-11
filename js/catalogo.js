let catalogo = document.getElementById("catalogo");

let carrito = JSON.parse(localStorage.getItem("carrito")) || []; // Cargar carrito desde localStorage

fetch("../data/lista.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            const img = `../img_cat/${element.id}.jpg`;//esto es para que solo guardando la imagen con el id como nombre ya la encuentre, aunque en el .json agregue rutas de imagen me gusto mas esta opcion

            const card = document.createElement("div");
            card.classList.add("col");

            //armar el carrito usando bootstrap con estilos usados en el curso de css
            card.innerHTML = `
                <div class="card h-100">
                    <img src="${img}" class="card-img-top" alt="${element.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${element.nombre}</h5>
                        <p class="card-text"><strong>Precio:</strong> $${element.precio}</p>
                        <button class="btn btn-primary agregar-carrito" data-id="${element.id}" data-nombre="${element.nombre}" data-precio="${element.precio}">Agregar al carrito</button>
                    </div>
                </div>
            `;

            catalogo.appendChild(card);
        });

// Añadir eventos a los botones de "Agregar al carrito"
document.querySelectorAll(".agregar-carrito").forEach(btn => {
    btn.onclick = function () {
        const id = this.dataset.id;
        const nombre = this.dataset.nombre;
        const precio = this.dataset.precio;

        agregarAlCarrito(id, nombre, parseFloat(precio));
    };
});


function agregarAlCarrito(id, nombre, precio) {
    // Buscar el producto en el carrito
    let productoEnCarrito = carrito.find(prod => prod.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } 
    // Si no está en el carrito, agregarlo con cantidad 1
    else {
        carrito.push({
            id: id,
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }
}


//  agregar productos al carrito
function agregarAlCarrito(id, nombre, precio) {
    const producto = carrito.find(item => item.id === id);//busca el producto en el carrito

    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    // guardar carrito en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // mensaje agregado al carrito
    Swal.fire({
        title: `"${nombre}" se ha añadido al carrito`,
        icon: "success",
        draggable: true
    })};})
