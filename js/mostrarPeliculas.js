import { conectaAPI } from "./conectaAPI.js";

//validaciones

export default function constructCard(title, description, director, image, url) {
    const movie = document.createElement("div");
    movie.className = "card";

    const words = description.split(' ');
    const shortDescription = words.slice(0, 15).join(' ');
    const remainingDescription = words.slice(15).join(' '); // Cambiado de 100 a 15 para mostrar el resto correctamente

    movie.innerHTML = `
        <div class="card-image">
            <img src="${image}" alt="${title}" class="card-img">
        </div>

        <div class="card-alldescription d-flex">
            <div class="card-text text-start">
                <h3 class="card-title mb-2">${title}</h3>
                <p class="card-description m-0">${shortDescription}<span class="more-text" style="display:none;"> ${remainingDescription}</span></p>
                <p class="card-director m-0"> <span class="fw-bold">Director:</span>${director}</p>
                <a href="#" class="read-more text-warning">Leer más</a>
                <a href="#" class="read-less text-warning" style="display:none;"> Leer menos</a>
            </div>
            <div class="card-buttons">
                <a href="${url}" class="btn-card mt-2 w-100" target="_blank">Ver tráiler</a>
                <a href="editar.html" class="btn-card mt-2 w-100"><i class="bi bi-trash-fill"></i></a>
            </div>
        </div>
    `;

    // Manejo de eventos para "Leer más"
    movie.querySelector('.read-more').addEventListener('click', function (e) {
        e.preventDefault();
        this.style.display = 'none'; // Oculta el enlace "Leer más"
        this.nextElementSibling.style.display = 'inline'; // Muestra "Leer menos"
        this.parentElement.querySelector('.more-text').style.display = 'inline'; // Muestra el texto restante
    });

    // Manejo de eventos para "Leer menos"
    movie.querySelector('.read-less').addEventListener('click', function (e) {
        e.preventDefault();
        this.style.display = 'none'; // Oculta el enlace "Leer menos"
        this.previousElementSibling.style.display = 'inline'; // Muestra "Leer más"
        this.parentElement.querySelector('.more-text').style.display = 'none'; // Oculta el texto restante
    });

    return movie;
}

document.addEventListener("DOMContentLoaded", () => {
    const lista = document.querySelector("[data-lista]");
    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');
    let currentPage = 1;
    const itemsPerPage = 3;
    let movies = [];

    prevButton.textContent = 'Anterior';
    nextButton.textContent = 'Siguiente';
    prevButton.className = 'pagination-button';
    nextButton.className = 'pagination-button';
    lista.appendChild(prevButton);
    lista.appendChild(nextButton);

    if (!lista) {
        console.error("Element with [data-lista] not found in the DOM.");
        return;
    }

    async function getMovies() {
        try {
            const listaAPI = await conectaAPI.getMovies();
            movies = listaAPI.map(element => constructCard(element.title, element.description, element.director, element.image, element.url));
            renderMovies();
        } catch (error) {
            console.error(error);
            lista.innerHTML = `<h2 class="mensaje">Error al cargar las películas</h2>`;
        }
    }

    function renderMovies() {
        lista.innerHTML = '';
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedMovies = movies.slice(start, end);
        paginatedMovies.forEach(movie => lista.appendChild(movie));
        lista.appendChild(prevButton);
        lista.appendChild(nextButton);
        updateButtons();
    }

    function updateButtons() {
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === Math.ceil(movies.length / itemsPerPage);
    }

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderMovies();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < Math.ceil(movies.length / itemsPerPage)) {
            currentPage++;
            renderMovies();
        }
    });

    getMovies();
});