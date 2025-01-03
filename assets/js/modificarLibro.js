import { conexionAPI } from "./conexionAPI.js";

export function configurarFormularioActualizacion() {
    document.body.addEventListener("click", async (event) => {
        // Detectar clic en el botón de actualizar
        const botonActualizar = event.target.closest(".update-btn");

        if (botonActualizar) {
            // Obtener datos desde la card correspondiente
            const card = botonActualizar.closest(".card");
            const idLibro = botonActualizar.dataset.id;
            const name = card.querySelector(".card-name").textContent;
            const price = card.querySelector(".card-price").textContent.replace("$", "");
            const imageUrl = card.querySelector(".card-image").src;

            // Crear y mostrar el formulario emergente
            const modal = document.createElement("div");
            modal.classList.add("modal");
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="cerrarModal close">&times;</span>
                    <h1>Actualizar Libro</h1>
                    <form id="formActualizar" class="book-form">
                        <input type="text" id="updateName" value="${name}" required />
                        <input type="number" id="updatePrice" value="${price}" required />
                        <input type="text" id="updateImageUrl" value="${imageUrl}" required />
                        <div class="form-buttons">
                            <button type="submit" class="btn btn-primary">Actualizar</button>
                            <button type="button" class="btn btn-secondary cerrarModal">Cancelar</button>
                        </div>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);

            // Cerrar modal
            document.querySelectorAll('.cerrarModal').forEach(element => {
                element.addEventListener("click", () => {
                    modal.remove(); // Asegúrate de que 'modal' esté definido correctamente
                });
            });

            // Manejar la actualización
            modal.querySelector("#formActualizar").addEventListener("submit", async (e) => {
                e.preventDefault();

                const nuevoNombre = modal.querySelector("#updateName").value;
                const nuevoPrecio = modal.querySelector("#updatePrice").value;
                const nuevaImagen = modal.querySelector("#updateImageUrl").value;

                try {
                    console.log(idLibro);
                    console.log(nuevoNombre);
                    console.log(nuevoPrecio);
                    console.log(nuevaImagen);
                    console.log("--------------------");
                    await conexionAPI.actualizarLibro(idLibro, nuevoNombre, nuevoPrecio, nuevaImagen);
                    alert("El libro ha sido actualizado exitosamente.");
                    modal.remove();

                } catch (error) {
                    alert("No se pudo actualizar el libro.");
                }
            });
        }
    });
}