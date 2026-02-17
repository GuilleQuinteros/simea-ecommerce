// Base de datos de productos - Aquí puedes agregar tus productos reales

export const products = [
  {
    id: 1,
    name: "Conjunto de Encaje Clásico",
    description: "Conjunto elegante de sostén y bombacha de encaje",
    image: "https://images.unsplash.com/photo-1583419574699-70a8f5c61f66?w=500&h=500&fit=crop",
    category: "conjuntos",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Blanco", "Rojo"],
    // Precios por cantidad (mayorista)
    stock: 50,  // ← NUEVO
    pricing: {
      unit: 2500,      // 1-5 unidades
      wholesale: 2200, // 6-11 unidades
      bulk: 2000       // 12+ unidades
    }
  },
  {
    id: 2,
    name: "Corpiño Push-Up",
    description: "Corpiño con realce y copas preformadas",
    image: "https://images.unsplash.com/photo-1606412366651-5b5f5e44bb76?w=500&h=500&fit=crop",
    category: "corpiños",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Nude", "Blanco"],
    stock: 50,  // ← NUEVO
    pricing: {
      unit: 1800,
      wholesale: 1600,
      bulk: 1400
    }
  },
  {
    id: 3,
    name: "Bombacha Colaless",
    description: "Bombacha colaless de microfibra",
    image: "https://images.unsplash.com/photo-1596993100471-7c5d32c6c6e0?w=500&h=500&fit=crop",
    category: "bombachas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Blanco", "Rosa", "Celeste"],
    stock: 50,  // ← NUEVO
    pricing: {
      unit: 800,
      wholesale: 700,
      bulk: 600
    }
  },
  {
    id: 4,
    name: "Conjunto Deportivo",
    description: "Top y calza deportiva para máxima comodidad",
    image: "https://images.unsplash.com/photo-1579364046732-c21c2f36f3aa?w=500&h=500&fit=crop",
    category: "deportivo",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Gris", "Azul marino"],
    stock: 50,  // ← NUEVO
    pricing: {
      unit: 3500,
      wholesale: 3200,
      bulk: 3000
    }
  },
  {
    id: 5,
    name: "Pijama de Seda",
    description: "Conjunto de pijama elegante de satén",
    image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=500&h=500&fit=crop",
    category: "pijamas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Champagne", "Bordo"],
    stock: 50,  // ← NUEVO
    pricing: {
      unit: 4500,
      wholesale: 4200,
      bulk: 4000
    }
  },
  {
    id: 6,
    name: "Body de Encaje",
    description: "Body completo de encaje con detalles elegantes",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500&h=500&fit=crop",
    category: "bodys",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Blanco"],
    stock: 50,  // ← NUEVO
    pricing: {
      unit: 3200,
      wholesale: 3000,
      bulk: 2800
    }
  },
  {
    id: 7,
    name: "Pack de 3 Bombachas",
    description: "Pack de 3 bombachas de algodón",
    image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&h=500&fit=crop",
    category: "bombachas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Variado"],
    stock: 50,  // ← NUEVO
    pricing: {
      unit: 1500,
      wholesale: 1300,
      bulk: 1100
    }
  },
  {
    id: 8,
    name: "Conjunto Brasilero",
    description: "Conjunto estilo brasilero con diseño moderno",
    image: "https://images.unsplash.com/photo-1583419574699-70a8f5c61f66?w=500&h=500&fit=crop",
    category: "conjuntos",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Animal print", "Negro", "Rojo"],
    stock: 50,  // ← NUEVO
    pricing: {
      unit: 2800,
      wholesale: 2500,
      bulk: 2300
    }
  }
];

// Categorías disponibles
export const categories = [
  { id: 'todos', name: 'Todos los Productos' },
  { id: 'conjuntos', name: 'Conjuntos' },
  { id: 'corpiños', name: 'Corpiños' },
  { id: 'bombachas', name: 'Bombachas' },
  { id: 'deportivo', name: 'Deportivo' },
  { id: 'pijamas', name: 'Pijamas' },
  { id: 'bodys', name: 'Bodys' }
];

// Métodos de pago disponibles
export const paymentMethods = [
  {
    id: 'efectivo',
    name: 'Efectivo',
    description: 'Pago en efectivo al momento de la entrega'
  },
  {
    id: 'transferencia',
    name: 'Transferencia Bancaria',
    description: 'CBU: 0000003100012345678901 - Banco Nación'
  },
  {
    id: 'mercadopago',
    name: 'Mercado Pago',
    description: 'Alias: SIMEA.ROPA.MP'
  },
  {
    id: 'ualá',
    name: 'Ualá',
    description: 'CVU: 0000000000000000000000 - Alias: SIMEA.UALA'
  }
];
