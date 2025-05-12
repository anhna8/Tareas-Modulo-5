let biblioteca = {
    "libros": [
        {"titulo": "La Metamorfosis", "autor": "Franz Kafka", "genero": "Ficcion, surrealismo", "disponible": true},
        {"titulo": "La ladrona de libros", "autor": "Markus Zusak", "genero": "Novela historica", "disponible": false} 
    ]
};

function leerDatos(callback) {
    setTimeout(() => {
        callback(biblioteca);
    }, 1000);
}

function mostrarLibros() {
    leerDatos((datos) => {
        console.log("Inventario de Libros:");
        datos.libros.forEach((libro, index) =>{
            console.log(`${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.disponible ? 'Disponible' : 'Prestado'})`);            
        });
    });
}

function agregarLibro(titulo, autor, genero, disponible){
    const nuevoLibro = { titulo, autor, genero, disponible };
    setTimeout(() => {
    }, 1000);
    biblioteca.libros.push(nuevoLibro);
}

function actualizarDisponibilidad(titulo, disponible) {
    setTimeout(() => {
        const libro = biblioteca.libros.find(libro => libro.titulo === titulo);
        if (libro) {
            libro.disponible = disponible;
            console.log(`Disponibilidad de "${titulo}" actualizada a ${disponible ? "Disponible" : "Prestado"}.`);
        } else {
            console.log(`Libro "${titulo}" no encontrado.`);
        }
    }, 1000);
}

mostrarLibros();
agregarLibro("El Principito", "La Divina Comedia", "Harry Potter y La Piedra Filosofal", true)
actualizarDisponibilidad("La Metamorfosis", false);