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
                        <button class="btn btn-primary agregar-carrito" id="catalogo"
                            data-id="${element.id}" 
                            data-nombre="${element.nombre}" 
                            data-precio="${element.precio}"
                            >Agregar al carrito
                        </button>
                    </div>
                </div>
            `;

            catalogo.appendChild(card);
        });

let botonesAgregar = document.querySelectorAll(".agregar-carrito");

for (let i=0; i < botonesAgregar.length; i++) {
    let boton = botonesAgregar[i];

    boton.onclick = function () {
        let id = boton.getAttribute("data-id");
        let nombre = boton.getAttribute("data-nombre");
        let precio = parseFloat(boton.getAttribute("data-precio"));

        agregarAlCarrito(id, nombre,parseFloat(precio));}
    };





//  agregar productos al carrito
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
    // guardar carrito en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // mensaje agregado al carrito
    Swal.fire({
        title: `"${nombre}" se ha añadido al carrito`,
        icon: "success",
        draggable: true
    })};

    })
