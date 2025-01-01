import { conexionAPI } from "./conexionAPI.js";
const booksContainer = document.getElementById("booksContainer");

export default function crearCard(id, name, price, imageUrl) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
          <img src="${imageUrl}" alt="Portada del libro ${name}">
          <div class="card-container--info">
            <p>${name}</p>
            <div class="card-container--footer">
              <span>$${price}</span>
              <div class="card-container--acciones">
                <button title="Actualizar">
                  <img src="./assets/img/icon-update.svg" alt="Icono de actualizar">
                </button>
                <button class="delete-btn" title="Eliminar" data-id="${id}">
                  <img src="./assets/img/icono-delete.svg" alt="Icono de eliminar">
                </button>
              </div>
            </div>
          </div>
        `;

    // Agregar evento al botón de eliminar
    card.querySelector(".delete-btn").addEventListener("click", async (event) => {
        const libroId = event.target.closest(".delete-btn").dataset.id; // Obtener ID del libro
        try {

            const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este libro?");

            if (confirmacion) {
              await conexionAPI.eliminarLibro(libroId); // Llamar la función de eliminación
              card.remove(); // Eliminar la card del DOM
              alert("El libro ha sido eliminado exitosamente.");
            }
        } catch (error) {
            alert("Hubo un problema al eliminar el libro.");
            alert(error);
        }
    });

    return card;
}

async function listarLibros() {
    try {
        const listaAPI = await conexionAPI.listarLibros();
    
        if (!Array.isArray(listaAPI) || listaAPI.length === 0) {
            // Manejo cuando no hay libros disponibles
            booksContainer.innerHTML = `
                <h2>
                    No se encontraron libros en el sistema.
                </h2>`;
        } else {
            // Renderizar los libros disponibles
            listaAPI.forEach(libro => booksContainer.appendChild(crearCard(libro.id,libro.name, libro.price, libro.imageUrl)));
        }
    
    } catch (error) {
        booksContainer.innerHTML=`
                <h2>
                Ha ocurrido un problema con la conexión :(  <br><br>
                    ${error}
                </h2>`
    }
}

listarLibros();
