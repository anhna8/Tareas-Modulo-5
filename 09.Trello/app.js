const API_URL = "http://localhost:3000/tareas";

const taskForm = document.getElementById("task-form");
const tituloInput = document.getElementById("titulo");
const descripcionInput = document.getElementById("descripcion");
const estadoInput = document.getElementById("estado");
const responsableInput = document.getElementById("responsable");
const contenedorTareas = {
    pendiente: document.querySelector("#pendientes ul"),
    "en-progreso": document.querySelector("#en-progreso ul"),
    terminada: document.querySelector("#terminadas ul")
};


async function getTareas() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        renderTareas(data.tareas);

    } catch (error) {
        console.error("Error al obtener tareas:", error);
    }
}

function renderTareas(tareas) {
    Object.values(contenedorTareas).forEach(contenedor => contenedor.innerHTML = "");
    tareas.forEach(tarea => {
        const tareaElemento = crearElementoTarea(tarea);
        contenedorTareas[tarea.estado].appendChild(tareaElemento);
    });
}

function crearElementoTarea(tarea) {
    const li = document.createElement("li");
    li.innerHTML = `
        <strong>${tarea.titulo}</strong>
        <p>${tarea.descripcion}</p>
        <small>Responsable: ${tarea.responsable}</small>
        <button onclick="editarTarea(${tarea.id})">✏️ Editar</button>
        <button onclick="eliminarTarea(${tarea.id})">🗑 Eliminar</button>
    `;
    return li;
}

async function crearTarea(event) {
    event.preventDefault();
    const nuevaTarea = {
        titulo: tituloInput.value.trim(),
        descripcion: descripcionInput.value.trim(),
        estado: estadoInput.value,
        responsable: responsableInput.value.trim()
    };

    if (!validarTarea(nuevaTarea)) return;

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaTarea)
        });
        getTareas();
        limpiarFormulario();
    } catch (error) {
        console.error("Error al crear tarea:", error);
    }
}

async function editarTarea(id) {
    const titulo = prompt("Nuevo título:");
    const descripcion = prompt("Nueva descripción:");
    const estado = prompt("Nuevo estado (pendiente, en-progreso, terminada):");
    const responsable = prompt("Nuevo responsable:");

    if (!titulo || !descripcion || !estado || !responsable) return;
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titulo, descripcion, estado, responsable })
        });
        getTareas();
    } catch (error) {
        console.error("Error al actualizar tarea:", error);
    }
}

//Eliminar tarea 
async function eliminarTarea(id) {
    if (!confirm("¿Seguro que quieres eliminar esta tarea?")) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        getTareas();
    } catch (error) {
        console.error("Error al eliminar tarea:", error);
    }
}

function validarTarea(tarea) {
    if (!tarea.titulo || !tarea.descripcion || !tarea.responsable) {
        alert("Todos los campos son obligatorios.");
        return false;
    }
    return true;
}

function limpiarFormulario() {
    tituloInput.value = "";
    descripcionInput.value = "";
    responsableInput.value = "";
}

taskForm.addEventListener("submit", crearTarea);


getTareas();