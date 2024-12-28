document.addEventListener("DOMContentLoaded", () => {
    const books = [
      {
        name: "Binding 13",
        price: "413.50",
        imageUrl: "./assets/img/Libros/portada-libro1.jpg",
      },
      {
        name: "El arte de ser nosotros",
        price: "325.00",
        imageUrl: "./assets/img/Libros/portada-libro2.jpg",
      },
    ];
  
    const booksContainer = document.getElementById("booksContainer");
  
    if (booksContainer) {
      books.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <img src="${book.imageUrl}" alt="Portada del libro ${book.name}">
          <div class="card-container--info">
            <p>${book.name}</p>
            <div class="card-container--footer">
              <span>$${book.price}</span>
              <div class="card-container--acciones">
                <button title="Actualizar">
                  <img src="./assets/img/icon-update.svg" alt="Icono de actualizar">
                </button>
                <button title="Eliminar">
                  <img src="./assets/img/icono-delete.svg" alt="Icono de eliminar">
                </button>
              </div>
            </div>
          </div>
        `;
        booksContainer.appendChild(card);
      });
    }
  });
  