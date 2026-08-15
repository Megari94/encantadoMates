# Encantado Mates — Catálogo + Carrito

Tienda online de mates artesanales (Resistencia, Chaco). React + Vite +
Tailwind CSS v4 en el frontend, Supabase (Postgres + Auth + Storage) como
backend, pedidos que se cierran por WhatsApp.

## Stack

- **React 19 + Vite** — SPA con `react-router-dom`
- **Tailwind CSS v4** — tokens de diseño en `src/index.css` (`@theme`)
- **Supabase** — tabla `products`, Auth (login del admin) y Storage (fotos)
- **Netlify** — hosting + redirects para el SPA (`netlify.toml`)

## 1. Configurar Supabase

1. Creá un proyecto en [supabase.com](https://supabase.com).
2. Andá a **SQL Editor** y ejecutá el contenido de [`supabase/schema.sql`](supabase/schema.sql).
   Esto crea:
   - la tabla `products` (nombre, descripción, precio, stock, categoría,
     imagen, `in_stock`)
   - la tabla `testimonials` (nombre, testimonio, puntaje)
   - las políticas de Row Level Security (lectura pública, escritura solo
     para usuarios autenticados)
   - el bucket público de Storage `product-images` con sus políticas
   - **Si tu proyecto ya existía** (ya habías corrido una versión anterior de
     `schema.sql`), en cambio ejecutá
     [`supabase/migrations/002_redesign.sql`](supabase/migrations/002_redesign.sql),
     que agrega solo lo nuevo (categoría de producto + tabla de testimonios)
     sin tocar lo que ya tenías.
3. Andá a **Authentication → Users → Add user** y creá el usuario admin
   (email + contraseña) que vas a usar para entrar a `/admin`. No hace falta
   ninguna tabla extra: el login usa Supabase Auth directamente.
4. Copiá tu **Project URL** y **anon public key** desde
   **Project Settings → API**.

## 2. Variables de entorno

Copiá `.env.example` a `.env` y completá con tus credenciales:

```bash
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-publica
```

## 3. Desarrollo local

```bash
npm install
npm run dev
```

- Sitio público: `http://localhost:5173/`
- Panel admin: `http://localhost:5173/admin` (redirige a `/admin/login` si no
  hay sesión)

## 4. Deploy en Netlify

1. Subí este repo a GitHub/GitLab/Bitbucket.
2. En Netlify: **Add new site → Import an existing project** y elegí el repo.
3. Build settings (ya están en `netlify.toml`, Netlify los detecta solo):
   - Build command: `npm run build`
   - Publish directory: `dist`
4. En **Site configuration → Environment variables**, agregá:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy. El archivo `netlify.toml` ya incluye el redirect `/* → /index.html`
   necesario para que las rutas de React Router (`/admin`, etc.) funcionen al
   recargar la página.

## Funcionalidad

**Vista cliente (pública, `/`), de una sola página con navegación por anclas**
- **Inicio**: hero + sección de valores/quiénes somos/a qué se dedican
- **Productos**: catálogo en grilla leído en vivo desde Supabase, con filtro
  por categoría (mates / termos / bombillas / accesorios) y búsqueda por
  nombre
- **Clientes**: testimonios (se ocultan solos si todavía no cargaste ninguno)
- **Contacto**: WhatsApp e Instagram, más un botón flotante de WhatsApp
  visible en todo el sitio para consultas rápidas sin pasar por el carrito
- Carrito persistente en `localStorage`, panel lateral tipo "liquid glass",
  con botón "Enviar pedido por WhatsApp" que arma el mensaje con el detalle
  del pedido

**Panel admin (`/admin`, protegido con Supabase Auth)**
- Pestañas **Productos** y **Testimonios**
- Alta, edición y borrado de productos (incluye categoría)
- Subida de fotos a Supabase Storage
- Marcar un producto como "sin stock" sin necesidad de borrarlo
- Alta, edición y borrado de testimonios de clientes

## Logo

`public/logo.png` (isotipo + wordmark) y `public/logo-mark.png` (solo el
isotipo) son el logo real, recortado y con fondo transparente a partir del
archivo que enviaste. `public/favicon.png` sale del mismo recorte. Si en
algún momento conseguís una versión en más alta resolución o con el fondo ya
transparente, simplemente reemplazá esos tres archivos — el resto de la app
los referencia por nombre, así que no hace falta tocar código.
