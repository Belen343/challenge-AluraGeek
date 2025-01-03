async function listarLibros() {
    //Método FETCH = Realiza una consulta dentro de otro servidor 
    //Recibe como parametro la URL del servidor y retorna una promesa
    const conexion = await fetch ("http://localhost:3001/libros");

    const parseConexion = conexion.json();

    return parseConexion;

}

async function enviarLibro(name, price, imageUrl) {
    // Obtener la lista de libros para determinar el último ID
    const libros = await listarLibros();
    const ultimoId = libros.length > 0 ? Math.max(...libros.map(libro => libro.id)) : 0;
    const nuevoId = ultimoId + 1;

    const conexion = await fetch("http://localhost:3001/libros",{
        method:"POST",
        headers: {"Content-type":"application/json"}, //Encabezado - Tipo de datos enviado
        body: JSON.stringify({ // Converitir Objeto a JSON
            id: nuevoId,
            name:name,
            price:price,
            imageUrl:imageUrl
        })
    })
    const parseConexion = conexion.json();

    if (!conexion.ok) {
        throw new Error("Ha ocurrido un error al enviar el video");
    }

    return parseConexion;
}

async function eliminarLibro(id) {
    const conexion = await fetch(`http://localhost:3001/libros/${id}`, {
        method: "DELETE",
    });

    if (!conexion.ok) {
        throw new Error("No se pudo eliminar el libro.");
    }

    return true; // Retornar éxito si no hay errores
}

async function actualizarLibro(id, name, price, imageUrl) {
    // Imprime los datos antes de enviar la solicitud
    console.log("Datos enviados para actualizar:", {
        id,
        name,
        price,
        imageUrl,
    });

    // Validar que los campos no estén vacíos
    if (!name || !price || !imageUrl) {
        throw new Error("Todos los campos deben estar completos.");
    }

    // Realizar la solicitud PUT
    const conexion = await fetch(`http://localhost:3001/libros/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            price,
            imageUrl,
        }),
    });

    // Verifica si la solicitud fue exitosa
    if (!conexion.ok) {
        throw new Error("Error al actualizar el libro.");
    }

    // Retorna la respuesta como JSON
    return conexion.json();
}

export const conexionAPI={
    listarLibros, enviarLibro, eliminarLibro, actualizarLibro,
}