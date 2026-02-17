# 📚 Guía de Aprendizaje - SIMEA E-commerce

Esta guía te ayudará a entender el código paso a paso. ¡Perfecto para developers junior!

## 🎯 Objetivo

Aprender a construir un e-commerce real con React, entendiendo cada concepto y decisión de arquitectura.

---

## 1️⃣ Estructura de Carpetas (Arquitectura del Proyecto)

### ¿Por qué organizamos así?

```
src/
├── components/    → Piezas de UI reutilizables
├── context/       → Estado global compartido
├── data/          → Datos y configuración
└── utils/         → Funciones auxiliares
```

**Principio clave**: **Separación de responsabilidades**. Cada carpeta tiene un propósito específico.

---

## 2️⃣ Context API (Estado Global)

### ¿Qué problema resuelve?

Sin Context API:
```
App → Header → CartButton
         ↓ (necesita pasar el carrito)
App → ProductCard → AddToCart
         ↓ (también necesita el carrito)
```

❌ **Problema**: Tienes que pasar el carrito por props a través de muchos componentes.

Con Context API:
```
CartContext (estado global)
     ↓                  ↓
CartButton        ProductCard
(lee el carrito)  (modifica el carrito)
```

✅ **Solución**: Cualquier componente puede acceder al carrito directamente.

### Código Explicado

**CartContext.jsx**:
```javascript
// 1. Crear el contexto
const CartContext = createContext();

// 2. Hook personalizado para usar el carrito
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Provider que envuelve la app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };
  
  // Compartir funciones y estado
  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
```

**Cómo usarlo en cualquier componente**:
```javascript
import { useCart } from '../context/CartContext';

function ProductCard() {
  const { addToCart } = useCart();
  
  return (
    <button onClick={() => addToCart(product)}>
      Agregar al Carrito
    </button>
  );
}
```

---

## 3️⃣ Hooks de React

### useState - Manejo de Estado Local

```javascript
const [quantity, setQuantity] = useState(1);

// quantity: el valor actual
// setQuantity: función para cambiar el valor
// 1: valor inicial
```

**Ejemplo real del proyecto**:
```javascript
const [selectedSize, setSelectedSize] = useState('M');

// Cambiar el talle
<button onClick={() => setSelectedSize('L')}>
  Talle L
</button>
```

### useEffect - Efectos Secundarios

```javascript
useEffect(() => {
  // Este código se ejecuta después de cada render
  localStorage.setItem('cart', JSON.stringify(cartItems));
}, [cartItems]); // Solo cuando cartItems cambie
```

**¿Cuándo usar useEffect?**
- Guardar datos en localStorage
- Hacer peticiones a APIs
- Suscribirse a eventos
- Limpiar recursos

---

## 4️⃣ Componentes Controlados vs No Controlados

### Componente Controlado (Recomendado)

El estado de React controla el valor:

```javascript
const [email, setEmail] = useState('');

<input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

✅ React siempre sabe el valor del input.

### Componente No Controlado

El DOM controla el valor:

```javascript
<input ref={emailRef} />
// Leer valor: emailRef.current.value
```

❌ React no sabe el valor hasta que lo lees.

---

## 5️⃣ Props - Pasar Datos entre Componentes

### De Padre a Hijo

```javascript
// Componente Padre
function ProductList() {
  return <ProductCard name="Conjunto" price={2500} />;
}

// Componente Hijo
function ProductCard({ name, price }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>${price}</p>
    </div>
  );
}
```

### De Hijo a Padre (Callback)

```javascript
// Padre
function Parent() {
  const handleClick = (data) => {
    console.log('Recibido del hijo:', data);
  };
  
  return <Child onAction={handleClick} />;
}

// Hijo
function Child({ onAction }) {
  return <button onClick={() => onAction('Hola')}>Click</button>;
}
```

---

## 6️⃣ Ciclo de Vida de un Componente

```javascript
function ProductCard() {
  // 1. MONTAJE - El componente se crea
  useEffect(() => {
    console.log('Componente montado');
    
    // 3. DESMONTAJE - El componente se elimina
    return () => {
      console.log('Componente desmontado');
    };
  }, []);
  
  // 2. ACTUALIZACIÓN - Cada vez que cambia el estado
  useEffect(() => {
    console.log('Estado actualizado');
  });
  
  return <div>Producto</div>;
}
```

---

## 7️⃣ Renderizado Condicional

### Operador Ternario

```javascript
{isLoading ? (
  <Spinner />
) : (
  <ProductList />
)}
```

### Short-Circuit (&&)

```javascript
{error && <ErrorMessage />}
// Si error es true, muestra ErrorMessage
// Si error es false, no muestra nada
```

### If-Else Normal

```javascript
if (isLoading) {
  return <Spinner />;
}

return <ProductList />;
```

---

## 8️⃣ Listas y Keys

### Renderizar una Lista

```javascript
const products = [
  { id: 1, name: 'Producto 1' },
  { id: 2, name: 'Producto 2' }
];

return (
  <div>
    {products.map(product => (
      <ProductCard 
        key={product.id}  // ⚠️ KEY es OBLIGATORIA
        product={product} 
      />
    ))}
  </div>
);
```

### ¿Por qué necesitamos keys?

React usa keys para:
1. Identificar qué elementos cambiaron
2. Mejorar el rendimiento
3. Mantener el estado correcto

❌ **Nunca uses el índice como key**:
```javascript
// MAL
{products.map((product, index) => (
  <div key={index}>{product.name}</div>
))}
```

✅ **Siempre usa un ID único**:
```javascript
// BIEN
{products.map(product => (
  <div key={product.id}>{product.name}</div>
))}
```

---

## 9️⃣ Event Handlers (Manejo de Eventos)

### Sintaxis Correcta

```javascript
// ✅ CORRECTO - Pasar referencia a la función
<button onClick={handleClick}>Click</button>

// ✅ CORRECTO - Arrow function si necesitas pasar argumentos
<button onClick={() => handleClick(id)}>Click</button>

// ❌ INCORRECTO - Ejecuta la función inmediatamente
<button onClick={handleClick()}>Click</button>
```

### Eventos Comunes

```javascript
// Click
<button onClick={handleClick}>Click</button>

// Cambio en input
<input onChange={(e) => setValue(e.target.value)} />

// Submit de formulario
<form onSubmit={(e) => {
  e.preventDefault(); // ⚠️ Prevenir reload de página
  handleSubmit();
}}>
```

---

## 🔟 LocalStorage - Persistencia de Datos

### Guardar Datos

```javascript
// Guardar
localStorage.setItem('cart', JSON.stringify(cartItems));

// Leer
const savedCart = localStorage.getItem('cart');
const cart = savedCart ? JSON.parse(savedCart) : [];

// Eliminar
localStorage.removeItem('cart');

// Limpiar todo
localStorage.clear();
```

### Patrón en el Proyecto

```javascript
// Inicializar estado desde localStorage
const [cartItems, setCartItems] = useState(() => {
  const saved = localStorage.getItem('cart');
  return saved ? JSON.parse(saved) : [];
});

// Guardar cuando cambie el estado
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}, [cartItems]);
```

---

## 1️⃣1️⃣ Funciones Auxiliares (Utils)

### ¿Por qué crear funciones auxiliares?

❌ **Código repetido**:
```javascript
// En varios componentes
const total = cartItems.reduce((sum, item) => sum + item.price, 0);
```

✅ **Función reutilizable**:
```javascript
// utils/helpers.js
export const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// En componentes
const total = calculateTotal(cartItems);
```

**Beneficios**:
- Código más limpio
- Fácil de mantener
- Fácil de testear
- DRY (Don't Repeat Yourself)

---

## 1️⃣2️⃣ Principios de Arquitectura

### 1. Separación de Responsabilidades

Cada módulo hace UNA cosa bien:
- **Componentes**: Solo UI
- **Context**: Solo estado global
- **Utils**: Solo lógica de negocio
- **Data**: Solo configuración

### 2. Composición sobre Herencia

React favorece composición:

```javascript
// ✅ Composición (React style)
<Modal>
  <CheckoutForm />
</Modal>

// ❌ Herencia (no usar en React)
class CheckoutModal extends Modal {
  // ...
}
```

### 3. Props Down, Events Up

- **Props**: Datos fluyen de padre a hijo ⬇️
- **Events**: Eventos fluyen de hijo a padre ⬆️

```javascript
// Padre envía datos al hijo
<ProductCard product={product} />

// Hijo notifica al padre
<ProductCard onAddToCart={handleAdd} />
```

---

## 🎯 Ejercicios Prácticos

### Nivel 1: Básico

1. Agrega un nuevo producto a `products.js`
2. Cambia los colores del tema en `tailwind.config.js`
3. Modifica el número de WhatsApp en `CheckoutModal.jsx`

### Nivel 2: Intermedio

1. Crea un componente `ProductFilter` para filtrar por precio
2. Agrega un botón "Limpiar Carrito"
3. Implementa un contador de items en el header

### Nivel 3: Avanzado

1. Agrega búsqueda de productos por nombre
2. Implementa un sistema de favoritos
3. Crea animaciones para cuando se agrega al carrito

---

## 🐛 Debugging Tips

### Console.log Estratégico

```javascript
function addToCart(product) {
  console.log('1. Producto recibido:', product);
  
  const newCart = [...cartItems, product];
  console.log('2. Nuevo carrito:', newCart);
  
  setCartItems(newCart);
  console.log('3. Estado actualizado');
}
```

### React DevTools

1. Instala la extensión React DevTools
2. Inspecciona componentes y su estado
3. Ve el árbol de componentes

### Errores Comunes

**Error: "Cannot read property of undefined"**
```javascript
// ❌ Malo
product.pricing.unit

// ✅ Bueno
product?.pricing?.unit ?? 0
```

**Error: "Too many re-renders"**
```javascript
// ❌ Malo - Loop infinito
useEffect(() => {
  setCount(count + 1);
}); // Sin array de dependencias

// ✅ Bueno
useEffect(() => {
  setCount(count + 1);
}, []); // Con array vacío
```

---

## 📖 Recursos para Seguir Aprendiendo

### Documentación Oficial
- [React Docs](https://react.dev) - Documentación oficial
- [Vite Guide](https://vitejs.dev/guide/) - Guía de Vite
- [Tailwind CSS](https://tailwindcss.com/docs) - Docs de Tailwind

### Tutoriales
- [React Tutorial](https://react.dev/learn) - Tutorial oficial de React
- [JavaScript.info](https://javascript.info/) - JavaScript moderno

### Práctica
- [Frontend Mentor](https://www.frontendmentor.io/) - Desafíos de UI
- [LeetCode](https://leetcode.com/) - Algoritmos y lógica

---

## 💪 Próximos Pasos

1. ✅ Entender todo el código del proyecto
2. 🔄 Hacer los ejercicios prácticos
3. 🎨 Personalizar el diseño a tu gusto
4. 🚀 Agregar nuevas features
5. 📱 Publicar tu proyecto en Vercel

---

**¡Sigue practicando y nunca dejes de aprender! 🚀**

¿Tienes dudas? Revisa el código, experimenta y aprende haciendo.
