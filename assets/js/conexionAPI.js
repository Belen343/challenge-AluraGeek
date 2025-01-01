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

export const conexionAPI={
    listarLibros, enviarLibro, eliminarLibro,
}