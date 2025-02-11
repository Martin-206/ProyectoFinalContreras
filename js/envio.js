    //traje todos los datos para despues enviarlos a algun lado, pero no tengo donde enviarlos aun
    const Enviar = document.getElementById("enviar_pedido");


    document.getElementById("enviar_pedido").onclick = function (event) {
        let nombre = document.getElementById("nombre").value;
        let email = document.getElementById("email").value;
        let telefono = document.getElementById("telefono").value;
        let mensaje = document.getElementById("mensaje").value;
    
        event.preventDefault(); //detiene el envio del formulario sin este comando no podia hacer que funcione

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];





        // mira si el carrito esta vacío
        if (carrito.length === 0) {  
            Swal.fire({
                title: "Carrito vacío",
                text: "completa los datos.",
                icon: "error"
            });
            return;
        }
            
        // mira si el nombre esta vacío
        if (nombre.length === 0) {  
            Swal.fire({
                title: "Debes completar los campos",
                text: "completa los datos.",
                icon: "error"
            });
            return;
        }
        
        // mira si el mail esta vacío
        if (email.length === 0) {  
            Swal.fire({
                title: "Debes completar los campos",
                text: "completa los datos.",
                icon: "error"
            });
            return;
        }
                // mira si el carrito esta vacío
        if (telefono.length === 0) {  
            Swal.fire({
                title: "Debes completar los campos",
                text: "completa los datos.",
                icon: "error"
            });
            return;
        }


        // limpia localStorage
        localStorage.removeItem("carrito");

        // mensaje de envio exitoso
        Swal.fire({
            title: "Pedido Enviado",
            text: "Nos comunicaremos a la brevedad.",
            icon: "success"
        });

        // Limpiar formulario
        document.querySelector("form").reset();
    };
