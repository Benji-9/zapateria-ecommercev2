# Zapatería E-Commerce

Este es un proyecto de comercio electrónico para una zapatería familiar, construido con [Next.js](https://nextjs.org), Tailwind CSS y MongoDB.

## Requisitos Previos

- Node.js instalado.
- Una base de datos MongoDB (local o Atlas).

## Instalación

1.  Clona el repositorio (si no lo has hecho).
2.  Instala las dependencias:

    ```bash
    npm install
    # O si faltan dependencias específicas:
    npm install mongoose lucide-react framer-motion clsx tailwind-merge
    ```

3.  Configura las variables de entorno:
    Crea un archivo `.env.local` en la raíz del proyecto y agrega tu cadena de conexión a MongoDB:

    ```bash
    MONGODB_URI=mongodb://localhost:27017/zapateria
    ```

## Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

-   `app/`: Rutas y páginas de la aplicación (Next.js App Router).
-   `components/`: Componentes reutilizables de React.
-   `lib/`: Utilidades y configuración de base de datos.
-   `models/`: Modelos de Mongoose.
