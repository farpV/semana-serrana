# Agenda personal

App personal de organización semanal: agenda, entreno con registro de series y medidas corporales, menú y lista de la compra, repertorio de la banda y estudio para los trayectos.

## Cómo funciona

Es una web estática: un solo `index.html` con su CSS y su JavaScript, sin servidor ni base de datos.

**Los datos se guardan en el navegador del dispositivo** (`localStorage`), no en internet. Cualquiera que abra la dirección web ve la app vacía: no hay nada suyo que consultar. A cambio, los datos no se sincronizan entre móvil y portátil y desaparecen si se borran los datos del navegador.

Para moverlos de un dispositivo a otro está el botón de datos (arriba a la derecha):

- **Exportar copia** descarga un `.json` con todo.
- **Importar y combinar** añade el contenido del archivo y sustituye las semanas que coincidan.
- **Restaurar** reemplaza todo lo del dispositivo por el archivo. Es lo que se usa al cambiar de móvil.

## Instalar en el móvil

Abrir la web en Chrome y elegir «Añadir a pantalla de inicio». Queda como una app y funciona sin conexión, porque el `sw.js` guarda en caché la pantalla completa.

## Archivos

| Archivo | Para qué |
|---|---|
| `index.html` | La app entera |
| `manifest.webmanifest` | Nombre, icono y colores al instalarla |
| `sw.js` | Service worker: funcionamiento sin conexión |
| `icon-*.png` | Iconos de la app |
| `img/*.webp` | Paisajes de cabecera, generados con código |
| `datos-iniciales.json` | Carga inicial de datos (no se sube al repositorio) |

## Privacidad

`datos-iniciales.json` y cualquier `.json` exportado quedan fuera del repositorio mediante `.gitignore`. El repositorio no debe contener agendas, menús ni registros: solo el código.

## Publicación

GitHub Pages sirve la carpeta tal cual, sin compilar nada. Rama `main`, carpeta raíz.

## Secciones

- **Hoy**: los bloques del día, con el que está en curso resaltado, las comidas y el entreno.
- **Agenda**: la semana por días, reparto de horas y edición manual de bloques.
- **Entreno**: plan de la semana con registro de series, medidas antropométricas con su evolución, y resumen mensual de entrenamientos y medidas.
- **Comida**: menú de cinco comidas y lista de la compra, a la que se pueden añadir productos a mano.
- **Banda**: ensayos de la semana y repertorio, con comentarios por marcha.
- **Estudio**: podcasts recomendados de la semana y biblioteca, con comentarios en cada uno.

El nombre de la carpeta y del repositorio sigue siendo `semana-serrana`, que era el nombre anterior de la app. Cambiarlo obligaría a cambiar también la dirección web.
