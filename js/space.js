document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('btnBuscar').addEventListener('click', function() { // se le agrega al botón de buscar imágenes un evento click
        let busqueda = document.getElementById('inputBuscar').value
            .trim()          // Elimina espacios al principio y al final
            .toLowerCase()   // Convierte todo a minúsculas
            .replace(/\s+/g, ' ');  // Reemplaza múltiples espacios con uno solo

        if(busqueda.trim() !== '') {
            fetch(`https://images-api.nasa.gov/search?q=${busqueda}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data); // para verificar cómo vamos
                    mostrarResultados(data.collection.items);
                })
                .catch(error => {
                    console.error('Error al realizar la búsqueda:', error);
                });
        } else {
            alert('Por favor, ingresa un término de búsqueda');
        };
    });

});

function mostrarResultados(items) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = ''; // Limpiamos los resultados anteriores

    // Añadimos la clase 'row' al contenedor para crear filas
    contenedor.classList.add('row');

    // Recorremos los items y creamos elementos HTML para mostrarlos
    items.forEach(item => {
        const titulo = item.data[0].title;
        const descripcion = item.data[0].description || 'No hay descripción disponible';
        const fecha = item.data[0].date_created;
        const imagen = item.links ? item.links[0].href : 'https://via.placeholder.com/200'; // Imagen por defecto si no hay disponible

        // Creamos un div para cada tarjeta
        const div = document.createElement('div');
        div.classList.add('col-md-4', 'mb-4'); // Clase Bootstrap para dividir en 3 columnas

        div.innerHTML = `
        <div class="card h-100">
            <img src="${imagen}" alt="${titulo}" class="card-img-top img-fluid" style="max-height: 200px; object-fit: cover;">
            <div class="card-body">
                <h5 class="card-title">${titulo}</h5>
                <div class="card-text description" style="max-height: 100px; overflow: auto;">
                    ${descripcion}
                </div>
                <p class="text-muted"><small>${new Date(fecha).toLocaleDateString()}</small></p>
            </div>
        </div>
        `;

        // Agregar la tarjeta al contenedor
        contenedor.appendChild(div);
    });
}