📋 Proyecto: Todo List con React y Fetch API

Este proyecto consiste en una aplicación de lista de tareas (Todo List) desarrollada con React, que se sincroniza con una API RESTful para almacenar, recuperar y eliminar tareas de forma remota. El objetivo principal fue integrar correctamente la lógica de React con la nueva API de 4Geeks Academy.



🚀 Tecnologías utilizadas

React (Vite)

JavaScript (ES6+)

Fetch API

Postman (para pruebas de endpoints)

API oficial: https://playground.4geeks.com/todo



🧠 Proceso de desarrollo

1. Configuración inicial

Se creó el proyecto con Vite y React.

Se definió el nombre de usuario en una constante:

const USERNAME = "SaulAmador";

2. Migración a la nueva API

Se descubrió que la API anterior (assets.breatheco.de) estaba obsoleta y generaba errores 500.

Se actualizó la URL base a:

const BASE_URL = "https://playground.4geeks.com/todo";

3. Creación del usuario

Se implementó una función initUserThenFetch() que:

Intenta obtener el usuario con GET /users/<username>.

Si no existe (404), lo crea con POST /users/<username> sin body.

4. Obtención de tareas

Se usa GET /users/<username>.

La respuesta contiene un objeto con la propiedad todos, que es el array de tareas:

{
  "name": "SaulAmador",
  "todos": [ ... ]
}

5. Agregar tarea

Se usa POST /todos/<username>.

El cuerpo debe incluir:

{
  "label": "Texto de la tarea",
  "is_done": false
}

6. Eliminar tarea

Se usa DELETE /todos/<id>.



🧪 Pruebas en Postman

Se realizaron pruebas exitosas en Postman para confirmar el funcionamiento de la API:

Crear usuario:

POST /users/SaulAmador

Sin body

Respuesta: 201 Created

Obtener tareas:

GET /users/SaulAmador

Respuesta: { name, todos: [...] }

Agregar tarea:

POST /todos/SaulAmador

Body: { label, is_done }

Respuesta: 201 Created

Eliminar tarea:

DELETE /todos/<id>

Respuesta: Todo deleted successfully


🎯 Resultado final

La aplicación funciona correctamente en Codespaces y en Postman.

Se logró la sincronización completa con la API.

Se cumplen los requisitos del proyecto:


💡 Aprendizajes clave

Cómo manejar errores 404 y 500 en APIs.

Cómo usar fetch para GET, POST, y DELETE.

Cómo interpretar respuestas JSON y actualizar el estado en React.

Cómo usar Postman para validar endpoints antes de integrarlos.


🧠 Autor

Saul AmadorDesarrollador en formación, apasionado por la congruencia técnica y emocional en cada proyecto.