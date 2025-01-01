import { conexionAPI } from "./conexionAPI.js";

const formulario = document.querySelector("[data-formulario]");

async function crearLibro(evento) {

    evento.preventDefault();//Evita que se ejecute de forma automática la acción que tiene por default el botón

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const url = document.querySelector("[data-url]").value;

    try {
        await conexionAPI.enviarLibro(name,price,url);
        window.location.href = "../../pages/nuevo-registro.html";
    } catch (error) {
        alert(error);
    }
}

formulario.addEventListener("submit", evento => crearLibro(evento));