# 🛍️ SIMEA E-commerce - Diseño Minimalista

E-commerce moderno y minimalista en blanco y negro para tienda de ropa interior con sistema de precios mayoristas, dashboard administrativo y checkout por WhatsApp.

## 🚀 Características

- ✅ **Diseño Minimalista** en tonos blanco y negro
- 🎛️ **Dashboard Administrativo** para gestionar productos
- 💰 **Sistema de Precios Dinámicos** (unitario, por mayor, mayorista)
- 🛒 **Carrito de Compras** con persistencia en localStorage
- 📱 **Checkout por WhatsApp** con mensaje preformateado
- 💳 **Múltiples Métodos de Pago** (efectivo, transferencia, billeteras)
- 🎨 **Diseño Responsive** que funciona en móvil, tablet y desktop
- 🔍 **Filtros por Categoría** para fácil navegación
- ✏️ **CRUD Completo** de productos desde el dashboard
- 📊 **Gestión de Stock** por talle y color

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework principal
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Estilos minimalistas y responsive
- **Lucide React** - Iconos minimalistas
- **Context API** - Gestión de estado global (Carrito y Productos)

## 🎨 Filosofía de Diseño

Este proyecto sigue un enfoque **minimalista** con:
- Paleta de colores: Blanco (#FFFFFF) y Negro (#000000)
- Tipografía: Sans-serif con tracking aumentado
- Sin bordes redondeados (sharp corners)
- Espaciado generoso
- Elementos UI planos (flat design)
- Foco en la legibilidad y claridad

## 📦 Dashboard Administrativo

El dashboard permite:
- ✏️ **Crear** nuevos productos con formulario completo
- 📝 **Editar** productos existentes
- 🗑️ **Eliminar** productos
- 👁️ **Visualizar** todos los productos
- 💾 **Persistencia** automática en localStorage

Para acceder al dashboard, haz clic en el botón "Admin" en la esquina superior derecha.

## 📦 Instalación

### Prerrequisitos

- Node.js 18 o superior
- npm o yarn

### Pasos de instalación

1. **Clonar o descargar el proyecto**
```bash
cd simea-ecommerce
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

## 🚀 Desplegar en Vercel

### Opción 1: Desde la interfaz web

1. Ve a [vercel.com](https://vercel.com)
2. Crea una cuenta o inicia sesión
3. Click en "Add New Project"
4. Importa tu repositorio de GitHub
5. Vercel detectará automáticamente que es un proyecto Vite
6. Click en "Deploy"

### Opción 2: Desde la terminal

```bash
# Instalar Vercel CLI
npm install -g vercel

# Hacer login
vercel login

# Desplegar
vercel
```

## 📝 Configuración Personalizada

### Cambiar número de WhatsApp

Edita el archivo `src/components/CheckoutModal.jsx`:

```javascript
const [whatsappNumber, setWhatsappNumber] = useState('5493794000000');
// Cambia por tu número con código de país
```

### Agregar/Editar Productos

Edita el archivo `src/data/products.js`:

```javascript
export const products = [
  {
    id: 1,
    name: "Nombre del Producto",
    description: "Descripción detallada",
    image: "URL de la imagen",
    category: "categoria",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Blanco"],
    pricing: {
      unit: 2500,      // Precio unitario
      wholesale: 2200, // Precio por mayor (6-11 unidades)
      bulk: 2000       // Precio mayorista (12+ unidades)
    }
  }
];
```

### Cambiar Métodos de Pago

Edita el archivo `src/data/products.js`:

```javascript
export const paymentMethods = [
  {
    id: 'mercadopago',
    name: 'Mercado Pago',
    description: 'Alias: TU.ALIAS.AQUI'
  }
];
```

### Personalizar Colores

Edita el archivo `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#FF69B4',   // Color principal
      secondary: '#FFC0CB', // Color secundario
    }
  },
}
```

## 📁 Estructura del Proyecto

```
simea-ecommerce/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Header.jsx      # Cabecera con toggle Admin/Tienda
│   │   ├── CategoryFilter.jsx  # Filtros de categoría
│   │   ├── ProductCard.jsx # Tarjeta de producto minimalista
│   │   ├── Cart.jsx        # Carrito lateral minimalista
│   │   ├── CheckoutModal.jsx   # Modal de checkout minimalista
│   │   └── Dashboard.jsx   # Dashboard administrativo CRUD
│   ├── context/
│   │   ├── CartContext.jsx # Context API para el carrito
│   │   └── ProductContext.jsx # Context API para productos (CRUD)
│   ├── data/
│   │   └── products.js     # Productos iniciales
│   ├── utils/
│   │   └── helpers.js      # Funciones auxiliares
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Punto de entrada
│   └── index.css           # Estilos globales minimalistas
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js      # Configuración de colores minimalistas
```

## 🎓 Conceptos que Aprenderás

### Para Developers Junior

1. **Componentes Reutilizables**: Cómo crear componentes que se pueden usar en múltiples lugares
2. **Props y State**: Manejo de datos en React
3. **Context API**: Compartir estado entre componentes sin prop drilling
4. **Hooks**: useState, useEffect, useContext
5. **LocalStorage**: Persistencia de datos en el navegador
6. **Responsive Design**: Diseño que se adapta a diferentes pantallas
7. **Event Handling**: Manejo de eventos de usuario
8. **Conditional Rendering**: Mostrar elementos según condiciones

### Flujo de Datos

```
User Action → Component → Context (Global State) → Update UI
```

## 💡 Mejoras Futuras Sugeridas

1. **Backend Real**: Integrar con una API real para gestionar productos
2. **Autenticación**: Sistema de login para el dashboard
3. **Subida de Imágenes**: Integrar servicio como Cloudinary
4. **Búsqueda**: Barra de búsqueda de productos
5. **Wishlist**: Lista de favoritos
6. **Reviews**: Sistema de reseñas de productos
7. **Pasarela de Pago**: Integrar MercadoPago o similar
8. **Tracking**: Seguimiento de pedidos
9. **Analytics**: Dashboard con estadísticas de ventas
10. **Multi-idioma**: Soporte para varios idiomas

## 📖 Cómo Usar el Dashboard

### Acceder al Dashboard
1. Haz clic en el botón **"Admin"** en la esquina superior derecha
2. Verás todos tus productos actuales

### Crear un Producto
1. Haz clic en **"Nuevo Producto"**
2. Completa el formulario:
   - Nombre del producto
   - Descripción
   - URL de la imagen (puedes usar Unsplash, por ejemplo)
   - Categoría
   - Talles (separados por coma: S, M, L, XL)
   - Colores (separados por coma: Negro, Blanco, Rojo)
   - Precios por cantidad (unitario, por mayor, mayorista)
3. Haz clic en **"Crear Producto"**

### Editar un Producto
1. En la tarjeta del producto, haz hover
2. Haz clic en el ícono de **lápiz (editar)**
3. Modifica los campos que necesites
4. Haz clic en **"Guardar Cambios"**

### Eliminar un Producto
1. En la tarjeta del producto, haz hover
2. Haz clic en el ícono de **papelera (eliminar)**
3. Confirma la eliminación

### Volver a la Tienda
1. Haz clic en el botón **"Tienda"** en la esquina superior derecha

## 🐛 Solución de Problemas

### El carrito no guarda los productos

Verifica que el navegador tenga localStorage habilitado:
```javascript
console.log(localStorage.getItem('simea-cart'));
```

### Las imágenes no cargan

Asegúrate de tener conexión a internet ya que las imágenes vienen de Unsplash.
Para usar imágenes propias, colócalas en la carpeta `public/images/` y cambia las rutas.

### Error al instalar dependencias

Prueba limpiar el caché:
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

## 📞 Soporte

Si tienes preguntas o problemas:
1. Revisa la documentación de [React](https://react.dev)
2. Consulta la documentación de [Vite](https://vitejs.dev)
3. Busca en [Stack Overflow](https://stackoverflow.com)

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y comercial.

---

**Desarrollado con ❤️ para SIMEA**

¡Feliz Coding! 🚀
