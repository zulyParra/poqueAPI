// obtener la API por medi de promesas
/**
 * fetch() es nuevo en js, permite controlar errores más fácilmente
 * trabaja por medi de protocolo https y se basa en promesas 
 * se basa en un sistema de peticiones y respuestas
 */

//  URL de la api
const API = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=00";

// obtener el retorno de la API

const getData = (api) => {
    return fetch(api)
        .then((response) => response.json()) //response o resolve; json o xml
        .then((json) => {
            paginacion(json), obtenerURLlInterna(json);
            console.log("json --> ", json);
        })
        .catch((error) => {
            console.log("error --> ", error);
        });
};


// obtener url interna
const obtenerURLlInterna = (data) => {
    document.getElementById("datosPersonajes").innerHTML = '';
    data.results.forEach((im) => {
        let urlInterna = im.url;
        devolverImagen(urlInterna, im.name);
    });
}
// obtener imagen
const devolverImagen = (url, name) => {
    return fetch(url)
        .then((response) => response.json())
        .then((json) => {
            let img = json.sprites.other.dream_world.front_default;
            llenarDatos(img, name)
        })
}

// --------------------
// let image = "https://pokeres.bastionbot.org/images/pokemon/1.png";
// console.log(image);
// llenar datos en nuestra página
const llenarDatos = (img, name) => {
    let html = "";
    html += '<div class="col">';
    html += '<div class="card" style="width: 10rem;">';
    html += `<img src="${img}" class="card-img-top" alt="..."></img>`;
    html += '<div class="card-body">';
    html += `<h5 class="card-title">${name}</h5>`;
    html += '</div>';
    html += '</div>';
    html += '</div>';
    // imprimir datos en html
    document.getElementById("datosPersonajes").innerHTML += html;
}
// paginación

const paginacion = (data) => {
    let nextDisable = '';
    let prevDisable = '';

    if (data.previous == null) {
        prevDisable = "disabled";
    }

    if (data.next == null) {
        nextDisable = "disabled";
    }

    let html = '';
    html += `<li class="page-item ${prevDisable}"><a class="page-link " onclick="getData('${data.previous}')">Previous</a></li>`;
    html += `<li class="page-item ${nextDisable}"><a class="page-link" onclick="getData('${data.next}')">Next</a></li>`;
    document.getElementById("paginacion").innerHTML = html;
}
// activo o invoco la función

getData(API);