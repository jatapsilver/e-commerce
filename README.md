# Ecommerce JatapSilver

**Ecommerce JatapSilver** es una plataforma de comercio electrónico desarrollada con **NestJS**. Este proyecto proporciona un backend robusto y escalable, diseñado específicamente para satisfacer las necesidades de tiendas en línea modernas. Con una arquitectura modular y flexible, permite gestionar de manera eficiente usuarios, productos, categorías y órdenes, mientras que también facilita la carga y manejo de imágenes a través de **Cloudinary**.

## Funcionalidades Clave

### 1. **Gestión de Usuarios**
   - **Consultar Usuarios**: Obtén la lista completa de usuarios.
   - **Búsqueda por ID**: Encuentra usuarios de manera eficiente usando su identificador único.
   - **Actualizar y Eliminar**: Actualiza o elimina usuarios según sea necesario.

### 2. **Gestión de Productos**
   - **Agregar Productos**: Permite agregar nuevos productos con detalles completos.
   - **Búsqueda por UUID**: Encuentra productos rápidamente usando su identificador único (UUID).
   - **Actualizar Productos**: Realiza modificaciones o actualizaciones en los productos existentes.

### 3. **Categorías de Productos**
   - **Crear Categorías**: Crea nuevas categorías para organizar los productos de manera efectiva.
   - **Buscar Categorías**: Encuentra rápidamente categorías existentes para su gestión.

### 4. **Gestión de Órdenes**
   - **Órdenes de Compra**: Gestiona el estado y detalles de las órdenes de los clientes de forma sencilla.

### 5. **Autenticación y Autorización**
   - **Acceso Sin Iniciar Sesión**: Algunos endpoints están disponibles sin necesidad de autenticación.
   - **Acceso Autenticado**: Otros endpoints requieren que el usuario esté autenticado.
   - **Permisos de Administrador**: Acceso restringido a ciertos endpoints solo para administradores.

### 6. **Integración con Cloudinary**
   - **Gestión de Imágenes**: Integra imágenes de productos de forma eficiente con **Cloudinary**, lo que permite la carga, almacenamiento y optimización de imágenes en la nube.

## Tecnologías Utilizadas

- **NestJS**: Framework Node.js para construir aplicaciones escalables y de alto rendimiento.
- **Cloudinary**: Solución para gestionar de manera eficiente las imágenes de los productos.
- **JWT (JSON Web Tokens)**: Autenticación y autorización segura basada en tokens.
- **PostgreSQL (u otro DB de tu elección)**: Base de datos para almacenar los datos de productos, usuarios y órdenes.

## Instalación

Para instalar y ejecutar el proyecto en tu entorno local, sigue estos pasos:

1. **Clona el repositorio**:
    ```bash
    git clone https://github.com/tuusuario/ecommerce-jatapsilver.git
    ```

2. **Instala las dependencias**:
    ```bash
    cd ecommerce-jatapsilver
    npm install
    ```

3. **Configura las variables de entorno**:
    - Crea un archivo `.env` en la raíz del proyecto.
    - Añade tus credenciales de **Cloudinary**, configuraciones de base de datos y otros parámetros necesarios.

4. **Inicia el servidor**:
    ```bash
    npm run start
    ```

   El servidor estará disponible en `http://localhost:3000`.

## Endpoints Principales

- **GET /users**: Obtiene la lista de usuarios.
- **GET /users/:id**: Busca un usuario por ID.
- **POST /products**: Agrega un nuevo producto.
- **GET /products/:uuid**: Busca un producto por UUID.
- **POST /categories**: Crea una nueva categoría.
- **GET /orders**: Obtiene las órdenes de compra.

## Contribuciones

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu contribución.
3. Realiza los cambios y asegúrate de que el código esté bien probado.
4. Envía un pull request con una descripción clara de las modificaciones.

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).
