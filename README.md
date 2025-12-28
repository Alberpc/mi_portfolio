## 🚀 Flujo de Trabajo

### Desarrollo Local

```bash
# Iniciar servidor de desarrollo
npm run dev
# → Abre http://localhost:5173
# → Haz cambios en src/App.jsx
# → Los cambios se ven automáticamente
# → Ctrl + C para salir cuando termines
```

### Desplegar a GitHub Pages

```bash
# 1. Build y preparar archivos
npm run deploy

# 2. Subir a GitHub
git commit -m "descripción de cambios"
git push

# 3. Espera 2-3 minutos
# 4. Recarga https://alberpc.github.io/mi_portfolio/ con Ctrl + Shift + R
```

### Añadir Nuevas Imágenes

1. Coloca la imagen en `src/assets/img/nombre.png`
2. Importa en `App.jsx`:

```javascript
import nombreImg from "./assets/img/nombre.png";
```

3. Usa la variable importada (no strings con rutas)

### Estructura del Proyecto

```
mi_portfolio/
├── src/
│   ├── assets/img/     ← Imágenes aquí
│   ├── App.jsx         ← Código principal
│   └── main.jsx
├── dist/               ← Build (generado automáticamente)
├── index.html          ← Se gestiona automáticamente
└── vite.config.js      ← Configuración
```

### Notas Importantes

- ⚠️ NO edites archivos en la raíz (index.html, assets/) manualmente
- ⚠️ Solo trabaja en la carpeta `src/`
- ✅ `npm run dev` restaura automáticamente el index.html correcto
- ✅ `npm run deploy` genera el build de producción
