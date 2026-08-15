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
   - la tabla `products` (nombre, descripción, precio, stock, imagen, `in_stock`)
   - las políticas de Row Level Security (lectura pública, escritura solo
     para usuarios autenticados)
   - el bucket público de Storage `product-images` con sus políticas
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

**Vista cliente (pública, `/`)**
- Catálogo en grilla (foto, nombre, precio, stock) leído en vivo desde Supabase
- Selector de cantidad + "Agregar al carrito"
- Carrito persistente en `localStorage`, panel lateral tipo "liquid glass"
- Botón "Enviar pedido por WhatsApp" → abre `https://wa.me/5493624716035` con
  el detalle del pedido precargado

**Panel admin (`/admin`, protegido con Supabase Auth)**
- Alta, edición y borrado de productos
- Subida de fotos a Supabase Storage
- Marcar un producto como "sin stock" sin necesidad de borrarlo

## Logo

`public/logo-mark.svg` y `public/favicon.svg` son una recreación vectorial
del isotipo (mano + mate) para tener algo funcional desde el día uno. Si
tenés el archivo original del logo (el que se ve en Instagram), reemplazá
esos dos SVG por tu versión — el resto de la app (header, footer, favicon,
loaders) los referencia por nombre de archivo, así que no hace falta tocar
código.
