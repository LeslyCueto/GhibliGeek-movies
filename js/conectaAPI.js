async function getMovies() {
    const conexion = await fetch("https://ghibli.rest/films",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    const conexionConvertida = await conexion.json();
    //  console.log(conexionConvertida);
    return conexionConvertida;
}
// getMovies();

async function createMovie (title,description,director,image,url) {
    const conexion = await fetch("https://ghibli.rest/films",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            description: description,
            director: director,
            image: image,
            url: url
        })
    });

    if (!conexion.ok) {
        throw new Error("Error al crear la película");
    }

    const conexionConvertida = await conexion.json();
    return conexionConvertida;
}

export const conectaAPI = { getMovies, createMovie };
