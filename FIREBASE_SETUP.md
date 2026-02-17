# 🔥 Guía de Configuración de Firebase (SIN Storage)

## ✅ Ventajas de Esta Configuración

- **100% GRATIS** - No requiere plan pago
- Las imágenes se guardan en **base64 dentro de Firestore**
- Firestore tiene **1GB gratis** (suficiente para 200-300 productos)
- Más simple de configurar

---

## Paso 1: Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Click en "Agregar proyecto"
3. Nombre del proyecto: `simea-ecommerce`
4. **Desactiva** Google Analytics (no lo necesitas por ahora)
5. Click en "Crear proyecto"
6. Espera a que se cree (toma ~30 segundos)

---

## Paso 2: Configurar Authentication

1. En el menú lateral izquierdo, click en **"Authentication"**
2. Click en **"Comenzar"** (Get Started)
3. Click en **"Correo electrónico/contraseña"** (Email/Password)
4. **Activa** la primera opción (Email/Password)
5. **NO actives** "Vínculo de correo electrónico (acceso sin contraseña)"
6. Click en **"Guardar"**

### Crear Usuario Admin:
1. En la pestaña **"Users"** de Authentication
2. Click en **"Agregar usuario"** (Add user)
3. Email: `admin@simea.com`
4. Contraseña: `simea2024`
5. Click en **"Agregar usuario"**

✅ **Listo! Tu usuario admin está creado**

---

## Paso 3: Configurar Firestore Database

1. En el menú lateral, click en **"Firestore Database"**
2. Click en **"Crear base de datos"** (Create database)
3. Selecciona **"Producción"** (Production mode)
4. Click en **"Siguiente"**
5. Ubicación: Selecciona **"southamerica-east1 (São Paulo)"**
6. Click en **"Habilitar"** (Enable)

### Aplicar Reglas de Seguridad:
1. Click en la pestaña **"Reglas"** (Rules)
2. **Reemplaza todo** el contenido con esto:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click en **"Publicar"** (Publish)

✅ **Base de datos lista!**

---

## Paso 4: Obtener Credenciales de Firebase

1. En la **página principal del proyecto** (Overview)
2. Click en el ícono **</>** (para agregar app web)
3. Apodo de la app: `SIMEA Web`
4. **NO marques** "También configura Firebase Hosting"
5. Click en **"Registrar app"**
6. Te aparecerá un código como este:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "simea-ecommerce.firebaseapp.com",
  projectId: "simea-ecommerce",
  storageBucket: "simea-ecommerce.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};
```

7. **COPIA ESTAS CREDENCIALES** (las necesitarás en el siguiente paso)
8. Click en **"Continuar a la consola"**

---

## Paso 5: Configurar el Proyecto React

1. Abre el archivo: `src/firebase/config.js`

2. **Reemplaza** las credenciales con las tuyas:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",              // ← Pega tu apiKey
  authDomain: "TU_AUTH_DOMAIN_AQUI",       // ← Pega tu authDomain
  projectId: "TU_PROJECT_ID_AQUI",         // ← Pega tu projectId
  storageBucket: "TU_STORAGE_BUCKET_AQUI", // ← Pega tu storageBucket
  messagingSenderId: "TU_SENDER_ID_AQUI",  // ← Pega tu messagingSenderId
  appId: "TU_APP_ID_AQUI"                  // ← Pega tu appId
};
```

3. **Guarda el archivo**

---

## Paso 6: Instalar Dependencias y Probar

```bash
# Instalar Firebase
npm install firebase

# Iniciar proyecto
npm run dev
```

---

## Paso 7: Probar la Aplicación

1. Abre `http://localhost:5173`
2. Click en **"Admin"** en el header
3. Login con:
   - Email: `admin@simea.com`
   - Contraseña: `simea2024`
4. ¡Crea tu primer producto!
5. Las imágenes se guardan en base64 en Firestore (no requiere Storage)

---

## 🎯 Verificar que Todo Funciona

### En Firebase Console:

1. **Authentication → Users**: Debes ver `admin@simea.com`
2. **Firestore → Data**: Verás la colección `products` cuando crees un producto
   - Los productos tendrán el campo `image` con el base64

### En la App:

- ✅ Login funciona
- ✅ Crear producto funciona
- ✅ Imágenes se guardan correctamente (en base64)
- ✅ Productos se ven en la tienda
- ✅ Editar/Eliminar funciona

---

## 📊 Límites del Plan Gratuito

- **Firestore**: 1GB de almacenamiento
- **Lecturas**: 50,000 por día
- **Escrituras**: 20,000 por día
- **Usuarios**: Ilimitados

### ¿Cuántos productos puedo tener?

Con imágenes optimizadas (~100-200KB cada una):
- **~200-300 productos** con el plan gratuito
- Si necesitas más, puedes migrar a Cloudinary (también gratis hasta 25GB)

---

## 💡 Optimización de Imágenes

Para aprovechar mejor el espacio:

1. **Antes de subir**, comprime tus imágenes:
   - Usa [TinyPNG](https://tinypng.com/) o [Squoosh](https://squoosh.app/)
   - Tamaño recomendado: 800x800px máximo
   - Peso objetivo: 100-200KB por imagen

2. El ImageUploader ya limita a 5MB, pero mientras más chicas mejor

---

## 🐛 Solución de Problemas

### Error: "Firebase: Error (auth/user-not-found)"
👉 No creaste el usuario admin en Firebase Console (Paso 2)

### Error: "Firebase: Permission denied"
👉 No aplicaste las reglas de Firestore (Paso 3)

### Error: "Firebase: Firebase App not initialized"
👉 No pegaste las credenciales en `src/firebase/config.js` (Paso 5)

### Los productos no se guardan
👉 Verifica que estés logueado como admin
👉 Revisa la consola del navegador (F12) para ver errores

---

## 🚀 Listo para Desplegar en Vercel

Una vez que todo funciona localmente:

```bash
git add .
git commit -m "Integración con Firebase completa"
git push origin main
```

Luego despliega en Vercel (detectará automáticamente el proyecto)

---

## 🔐 Seguridad en Producción

**IMPORTANTE**: Las credenciales de Firebase son públicas y está bien que estén en el código. Firebase usa **reglas de seguridad** para proteger los datos, NO oculta las credenciales.

Lo que SÍ debes proteger:
- ✅ Reglas de Firestore correctamente configuradas
- ✅ Solo usuarios autenticados pueden escribir

---

## 🎓 ¿Y si crezco mucho?

Si más adelante necesitas más espacio:

1. **Migrar a Cloudinary** (gratis hasta 25GB)
2. **Upgrade a Firebase Blaze** (pagas solo lo que usas, muy barato)
3. Las imágenes base64 siguen funcionando bien para 200-300 productos

---

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:
1. Revisa la consola del navegador (F12 → Console)
2. Revisa que seguiste todos los pasos
3. Verifica que las credenciales estén correctas
4. Asegúrate de haber creado el usuario admin

**¡Éxito con tu tienda! 🎉**

## Paso 1: Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Click en "Agregar proyecto"
3. Nombre del proyecto: `simea-ecommerce`
4. **Desactiva** Google Analytics (no lo necesitas por ahora)
5. Click en "Crear proyecto"
6. Espera a que se cree (toma ~30 segundos)

---

## Paso 2: Configurar Authentication

1. En el menú lateral izquierdo, click en **"Authentication"**
2. Click en **"Comenzar"** (Get Started)
3. Click en **"Correo electrónico/contraseña"** (Email/Password)
4. **Activa** la primera opción (Email/Password)
5. **NO actives** "Vínculo de correo electrónico (acceso sin contraseña)"
6. Click en **"Guardar"**

### Crear Usuario Admin:
1. En la pestaña **"Users"** de Authentication
2. Click en **"Agregar usuario"** (Add user)
3. Email: `admin@simea.com`
4. Contraseña: `simea2024`
5. Click en **"Agregar usuario"**

✅ **Listo! Tu usuario admin está creado**

---

## Paso 3: Configurar Firestore Database

1. En el menú lateral, click en **"Firestore Database"**
2. Click en **"Crear base de datos"** (Create database)
3. Selecciona **"Producción"** (Production mode)
4. Click en **"Siguiente"**
5. Ubicación: Selecciona **"southamerica-east1 (São Paulo)"**
6. Click en **"Habilitar"** (Enable)

### Aplicar Reglas de Seguridad:
1. Click en la pestaña **"Reglas"** (Rules)
2. **Reemplaza todo** el contenido con esto:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click en **"Publicar"** (Publish)

✅ **Base de datos lista!**

---

## Paso 4: Configurar Storage (para imágenes)

1. En el menú lateral, click en **"Storage"**
2. Click en **"Comenzar"** (Get started)
3. Selecciona **"Producción"** (Production mode)
4. Click en **"Siguiente"**
5. Ubicación: Debe ser la misma que Firestore (**southamerica-east1**)
6. Click en **"Listo"** (Done)

### Aplicar Reglas de Seguridad:
1. Click en la pestaña **"Reglas"** (Rules)
2. **Reemplaza todo** el contenido con esto:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{imageId} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

3. Click en **"Publicar"** (Publish)

✅ **Storage configurado!**

---

## Paso 5: Obtener Credenciales de Firebase

1. En la **página principal del proyecto** (Overview)
2. Click en el ícono **</>** (para agregar app web)
3. Apodo de la app: `SIMEA Web`
4. **NO marques** "También configura Firebase Hosting"
5. Click en **"Registrar app"**
6. Te aparecerá un código como este:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "simea-ecommerce.firebaseapp.com",
  projectId: "simea-ecommerce",
  storageBucket: "simea-ecommerce.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};
```

7. **COPIA ESTAS CREDENCIALES** (las necesitarás en el siguiente paso)
8. Click en **"Continuar a la consola"**

---

## Paso 6: Configurar el Proyecto React

1. Abre el archivo: `src/firebase/config.js`

2. **Reemplaza** las credenciales con las tuyas:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",              // ← Pega tu apiKey
  authDomain: "TU_AUTH_DOMAIN_AQUI",       // ← Pega tu authDomain
  projectId: "TU_PROJECT_ID_AQUI",         // ← Pega tu projectId
  storageBucket: "TU_STORAGE_BUCKET_AQUI", // ← Pega tu storageBucket
  messagingSenderId: "TU_SENDER_ID_AQUI",  // ← Pega tu messagingSenderId
  appId: "TU_APP_ID_AQUI"                  // ← Pega tu appId
};
```

3. **Guarda el archivo**

---

## Paso 7: Instalar Dependencias y Probar

```bash
# Instalar Firebase
npm install firebase

# Iniciar proyecto
npm run dev
```

---

## Paso 8: Probar la Aplicación

1. Abre `http://localhost:5173`
2. Click en **"Admin"** en el header
3. Login con:
   - Email: `admin@simea.com`
   - Contraseña: `simea2024`
4. ¡Crea tu primer producto!
5. Las imágenes ahora se suben a Firebase Storage automáticamente

---

## 🎯 Verificar que Todo Funciona

### En Firebase Console:

1. **Authentication → Users**: Debes ver `admin@simea.com`
2. **Firestore → Data**: Verás la colección `products` cuando crees un producto
3. **Storage → Files**: Verás la carpeta `products/` con las imágenes

### En la App:

- ✅ Login funciona
- ✅ Crear producto funciona
- ✅ Imágenes se suben correctamente
- ✅ Productos se ven en la tienda
- ✅ Editar/Eliminar funciona

---

## 🐛 Solución de Problemas

### Error: "Firebase: Error (auth/user-not-found)"
👉 No creaste el usuario admin en Firebase Console (Paso 2)

### Error: "Firebase: Permission denied"
👉 No aplicaste las reglas de Firestore/Storage (Paso 3 y 4)

### Error: "Firebase: Firebase App not initialized"
👉 No pegaste las credenciales en `src/firebase/config.js` (Paso 6)

### Los productos no se guardan
👉 Verifica que estés logueado como admin
👉 Revisa la consola del navegador (F12) para ver errores

---

## 🚀 Listo para Desplegar en Vercel

Una vez que todo funciona localmente:

```bash
git add .
git commit -m "Integración con Firebase completa"
git push origin main
```

Luego despliega en Vercel (detectará automáticamente el proyecto)

---

## 🔐 Seguridad en Producción

**IMPORTANTE**: Las credenciales de Firebase son públicas y está bien que estén en el código. Firebase usa **reglas de seguridad** para proteger los datos, NO oculta las credenciales.

Lo que SÍ debes proteger:
- ✅ Reglas de Firestore correctamente configuradas
- ✅ Reglas de Storage correctamente configuradas  
- ✅ Solo usuarios autenticados pueden escribir

---

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:
1. Revisa la consola del navegador (F12 → Console)
2. Revisa que seguiste todos los pasos
3. Verifica que las credenciales estén correctas
4. Asegúrate de haber creado el usuario admin

**¡Éxito con tu tienda! 🎉**
