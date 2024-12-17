import { conectaAPI } from "./conectaAPI.js";

const formulariopelicula = document.querySelector("[data-formulario]");

async function createVideo(event) {
    event.preventDefault();
    const title = event.target.querySelector("[data-title]").value;
    const description = event.target.querySelector("[data-description]").value;
    const director = event.target.querySelector("[data-director]").value;
    const image = event.target.querySelector("[data-image]").value;
    const url = event.target.querySelector("[data-url]").value;

    try {
        await conectaAPI.createMovie(title, description, director, image, url);
        formulariopelicula.reset();
        alert("Película creada con éxito");
    } catch (error) {
        console.error(error);
        alert("Error al crear la película"+error);
    }
}

formulariopelicula.addEventListener("submit", event => createVideo(event));
