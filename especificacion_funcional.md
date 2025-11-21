# Especificación Funcional: E-commerce Zapatería (Estilo Grimoldi)

**Rol:** Product Owner / UX Lead
**Fecha:** 21/11/2025
**Versión:** 1.0
**Objetivo:** Definir funcionalidades, flujos y experiencia de usuario para una tienda online de calzado en Argentina con checkout vía WhatsApp.

---

## 1. Contexto del Negocio
*   **Rubro:** Zapatería familiar (Zapatos, zapatillas, sandalias, botas).
*   **Público:** General (Mujer, Hombre, Niños).
*   **Modelo de Venta:** Catálogo online -> Carrito -> Pedido por WhatsApp -> Pago y Envío coordinado offline/chat.
*   **Mercado:** Argentina (Mercado Pago, Transferencias, Efectivo).
*   **Estilo Visual:** Similar a Grimoldi (Limpio, categorías claras, foco en producto y promociones).

---

## 2. Módulos y Funcionalidades

### 2.1. Home (Página Principal)
**Objetivo:** Impactar visualmente, comunicar promociones vigentes y dirigir tráfico rápidamente a las categorías principales.
*   **Imprescindibles (MVP):**
    *   [ ] **Banner Principal (Hero):** Carrusel o imagen estática full-width con CTA (Call to Action) claro (ej: "Nueva Temporada", "Hot Sale").
    *   [ ] **Navegación Principal:** Menú claro: Mujer, Hombre, Niños, Accesorios, Sale/Ofertas.
    *   [ ] **Destacados:** Sección de "Lo más vendido" o "Novedades".
    *   [ ] **Accesos Rápidos:** Botones visuales a categorías clave (ej: Zapatillas, Botas, Sandalias).
    *   [ ] **Footer:** Datos de contacto, redes sociales, link a "Cómo comprar".
*   **Recomendadas (Nice to have):**
    *   [ ] **Banner Secundario:** Para promociones bancarias o cuotas (muy importante en Argentina).
    *   [ ] **Instagram Feed:** Integración visual de últimas publicaciones.
    *   [ ] **Pop-up de Suscripción:** Newsletter con descuento en primera compra.
*   **Reglas de Negocio:**
    *   Priorizar visualización de ofertas vigentes.
    *   Las imágenes deben ser de alta calidad (lifestyle).

### 2.2. Catálogo / Categorías
**Objetivo:** Permitir al usuario explorar productos de manera ordenada y filtrada.
*   **Imprescindibles (MVP):**
    *   [ ] **Grilla de Productos:** Fotos grandes, nombre, precio, precio anterior (tachado si hay oferta), etiqueta de descuento (ej: "-20%").
    *   [ ] **Ordenamiento:** Menor precio, Mayor precio, Más nuevos.
    *   [ ] **Paginación o "Cargar más".**
*   **Recomendadas:**
    *   [ ] **Vista Rápida (Quick View):** Ver detalles sin entrar al producto.
    *   [ ] **Etiquetas:** "Nuevo", "Últimos pares", "Envío Gratis".
    *   [ ] **Banner de Categoría:** Imagen cabecera específica por categoría.

### 2.3. Buscador y Filtros
**Objetivo:** Reducir el tiempo de búsqueda del usuario.
*   **Imprescindibles (MVP):**
    *   [ ] **Filtros Laterales/Superiores:** Talle (CRÍTICO en calzado), Color, Precio (rango), Categoría/Tipo.
    *   [ ] **Buscador Predictivo:** Búsqueda por nombre o tipo de producto.
*   **Recomendadas:**
    *   [ ] **Filtros Dinámicos:** Ocultar filtros sin resultados.
    *   [ ] **Búsqueda por Marca:** Si se manejan múltiples marcas.

### 2.4. Página de Producto (PDP)
**Objetivo:** Convencer al usuario y facilitar la selección de variante.
*   **Imprescindibles (MVP):**
    *   [ ] **Galería de Imágenes:** Zoom al pasar el mouse o click.
    *   [ ] **Selector de Talle:** Botones claros. Indicar visualmente stock (talle grisado o tachado si no hay).
    *   [ ] **Selector de Color:** Si aplica, con cambio de foto principal al seleccionar.
    *   [ ] **Precio:** Destacado. Mostrar cuotas si aplica (ej: "3 cuotas sin interés de $...").
    *   [ ] **Botón "Agregar al Carrito":** Grande, visible, sticky en mobile.
    *   [ ] **Descripción:** Materiales, altura de taco, calce (horma chica/grande/normal).
    *   [ ] **Guía de Talles:** Tabla de medidas (cm de plantilla).
*   **Recomendadas:**
    *   [ ] **Productos Relacionados:** "Completa tu look" o "También te puede gustar".
    *   [ ] **Calculador de Envío:** Input de código postal (aunque se coordine luego, dar un estimado suma).
    *   [ ] **Botón WhatsApp Directo:** "Consultar por este producto".

### 2.5. Carrito de Compras
**Objetivo:** Revisión final antes de enviar el pedido.
*   **Imprescindibles (MVP):**
    *   [ ] **Listado de Ítems:** Foto, nombre, talle, color, cantidad, precio unitario, subtotal.
    *   [ ] **Edición:** Eliminar ítem, cambiar cantidad.
    *   [ ] **Resumen de Cuenta:** Subtotal, Total estimado.
    *   [ ] **Botón "Iniciar Pedido":** Lleva al checkout simplificado.
*   **Reglas de Negocio:**
    *   Validar stock en tiempo real al cargar el carrito.
    *   Mostrar mensaje de "Envío Gratis" si supera X monto.

### 2.6. Checkout + Flujo WhatsApp
**Objetivo:** Capturar datos mínimos y derivar la transacción al canal conversacional.
*   **Imprescindibles (MVP):**
    *   [ ] **Formulario Simple:** Nombre, Apellido, Teléfono (WhatsApp), Email (opcional), Dirección (opcional o solo localidad).
    *   [ ] **Método de Entrega (Pre-selección):** Envío a domicilio / Retiro en local.
    *   [ ] **Método de Pago (Pre-selección):** Transferencia / Efectivo / Mercado Pago Link.
    *   [ ] **Generación de Mensaje:** Crear un string de texto con el detalle del pedido.
    *   [ ] **Botón "Enviar Pedido por WhatsApp":** Abre la API de WhatsApp con el mensaje pre-llenado.
*   **Reglas de Negocio:**
    *   El pedido se guarda en base de datos con estado "Pendiente" al hacer click, aunque el usuario no envíe el mensaje (para recuperación de carritos).
    *   Mensaje debe incluir ID de pedido para referencia.

### 2.7. Cuenta de Usuario / Favoritos
*   **Opcional:** Para este modelo, el login no es bloqueante.
*   **Recomendadas:**
    *   [ ] **Wishlist (Favoritos):** Guardar productos para después (cookie o local storage si no hay login).
    *   [ ] **Historial de Pedidos:** Si hay login.

### 2.8. Promociones / Banners
*   **Funcionalidades:**
    *   [ ] **Gestor de Banners:** Poder cambiar banners de home fácilmente.
    *   [ ] **Precios de Oferta:** Lógica de precio de lista vs precio venta.
    *   [ ] **Etiquetas Automáticas:** 2x1, 3x2, % OFF.

### 2.9. Panel de Administración (Backoffice)
**Objetivo:** Gestión del negocio.
*   **Imprescindibles:**
    *   [ ] **ABM Productos:** Carga de fotos, precios, stock por talle/color.
    *   [ ] **Gestión de Pedidos:** Ver pedidos entrantes (generados en web), marcar como "Pagado", "Enviado", "Entregado".
    *   [ ] **Control de Stock:** Ajuste rápido de inventario.

### 2.10. Integraciones y Técnicos
*   **Analytics:** Google Analytics 4 (eventos de e-commerce: view_item, add_to_cart, purchase - simulado al clickear WhatsApp).
*   **Pixel Meta:** Para campañas de publicidad.
*   **SEO:** Meta tags dinámicos, sitemap.xml, estructura de encabezados (H1, H2).
*   **Performance:** Carga diferida de imágenes (lazy loading), optimización de assets.

---

## 3. Flujo de Usuario (User Journey)

1.  **Aterrizaje:** Usuario llega a Home por anuncio de Instagram. Ve banner de "Sandalias 30% OFF".
2.  **Navegación:** Hace click en banner o categoría "Mujer > Sandalias".
3.  **Listado:** Ve grilla de sandalias. Filtra por Talle 38.
4.  **Selección:** Entra a un producto que le gusta. Revisa fotos.
5.  **Variante:** Selecciona Color "Negro" y Talle "38". Ve que está disponible.
6.  **Acción:** Clickea "Agregar al Carrito". Feedback visual (toast o mini-cart se abre).
7.  **Carrito:** Decide finalizar. Va al Carrito. Revisa ítems.
8.  **Checkout:** Clickea "Iniciar Pedido". Completa: "Ana Gómez", "11-1234-5678", "Retiro en sucursal".
9.  **Conversión:** Clickea "Enviar Pedido por WhatsApp".
10. **WhatsApp:** Se abre su app de WhatsApp con el mensaje: *"Hola! Quiero realizar el pedido #1024: Sandalia X, Negro, 38. Mis datos: Ana Gómez..."*. Envía el mensaje.
11. **Cierre:** El dueño responde, pasa alias de CBU o link de pago. Ana paga y envía comprobante.

---

## 4. Wireframes Textuales

### 4.1. Home (Estilo Grimoldi)
*   **Header:** Logo Centro/Izq | Buscador | Icono Usuario | Icono Carrito (con contador).
*   **Nav:** Mujer | Hombre | Niños | Accesorios | SALE (en rojo).
*   **Hero:** Slider ancho completo. Foto aspiracional + Texto "NUEVA COLECCIÓN" + Botón "VER MÁS".
*   **Categorías Destacadas:** 3 columnas con fotos: "Zapatillas", "Botas", "Zapatos de vestir".
*   **Carrusel de Productos:** Título "Lo más buscado". Cards de productos deslizables.
*   **Banner Secundario:** "3 y 6 Cuotas Sin Interés" con logos de tarjetas.
*   **Footer:** Suscribite al newsletter | Links de ayuda | Redes | Dirección local.

### 4.2. Detalle de Producto
*   **Izquierda (Desktop):** Columna de miniaturas verticales + Foto principal grande.
*   **Derecha:**
    *   Breadcrumb (Inicio > Mujer > Zapatillas).
    *   Título del Producto (H1).
    *   Precio (Grande) + Precio anterior (chico tachado).
    *   "3 cuotas sin interés de $XXX".
    *   Selector Color: Círculos de color o mini fotos.
    *   Selector Talle: Botones cuadrados [35] [36] [37]... (Tachados los sin stock).
    *   Link "Ver guía de talles".
    *   Botón CTA "AGREGAR AL CARRITO" (Ancho completo o destacado).
    *   Acordeones: Descripción, Envíos, Cambios.

### 4.3. Pantalla Final "Enviar Pedido"
*   **Título:** "¡Casi listo!"
*   **Resumen:** Lista compacta de lo que lleva. Total a pagar.
*   **Formulario:** Campos limpios.
*   **Botón Principal:** Verde (color WhatsApp) con icono. Texto: "Finalizar en WhatsApp".
*   **Texto legal:** "Al enviar, coordinarás el pago y envío directamente con un vendedor."

---

## 5. Estados y Mensajes Clave

*   **Sin Stock (Variante):** Al seleccionar talle/color, botón "Agregar" se deshabilita y cambia texto a "Sin Stock" o aparece botón "Avísame cuando llegue".
*   **Talle Agotado:** Visualmente tachado o con opacidad reducida en el selector.
*   **Carrito Vacío:** "Tu carrito está vacío. ¡Mirá lo nuevo!" + Botón "Ir a la tienda".
*   **Envío Gratis:** Barra de progreso en carrito: "¡Te faltan $5000 para envío gratis!".
*   **Error de Carga:** "Ups, hubo un problema. Intentá de nuevo." (Feedback amigable).

---

## 6. Métricas a Trackear (KPIs)

1.  **Tasa de "Add to Cart":** % de visitas que agregan algo al carrito.
2.  **Tasa de Inicio de Checkout:** % de carritos que pasan al formulario.
3.  **Tasa de Conversión (Click to WhatsApp):** % de checkouts que hacen click en el botón de WhatsApp. *Esta es tu conversión online principal.*
4.  **Conversión Real (Offline):** Cruzar datos de pedidos web vs ventas concretadas en local/chat.
5.  **Ticket Promedio:** Valor promedio de los pedidos generados.
6.  **Productos más vistos vs más vendidos:** Para optimizar stock.
