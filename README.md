# Lotería de Navidad 2026

Sitio web estático para información, comprobación de números y reparto de décimos de la Lotería de Navidad 2026.

## 🎄 Características

- **Comprobador de Números**: Introduce tu número de 5 cifras para comprobar si está premiado
- **Vista de Premios**: Todas las categorías y cuantías del sorteo
- **Repartidor de Décimos**: Calcula cuánto corresponde a cada participante (incluye impuestos)
- **Fechas Importantes**: Calendario completo del sorteo
- **FAQ**: Preguntas frecuentes con Schema JSON-LD para SEO
- **Modo Demo**: Funciona offline antes del sorteo con resultados de prueba

## 📁 Estructura del Proyecto

```
├── index.html      # Página principal
├── styles.css      # Estilos CSS (design system con variables)
├── app.js          # Lógica de la aplicación
├── results.js      # Configuración de resultados (demo/oficial)
└── README.md       # Este archivo
```

## 🚀 Despliegue en GitHub Pages

### Opción 1: Rama `main` (Recomendado)

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, selecciona **Pages**
4. En "Build and deployment":
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Haz clic en **Save**
6. Espera unos minutos y tu sitio estará disponible en `https://[usuario].github.io/[repo]/`

### Opción 2: GitHub Actions

1. Ve a **Settings** > **Pages**
2. En "Build and deployment":
   - **Source**: GitHub Actions
3. Selecciona el workflow "Static HTML" si está disponible

## 📅 Actualizar Resultados Oficiales (22 Diciembre 2026)

Una vez celebrado el sorteo, sigue estos pasos para activar los resultados oficiales:

### 1. Edita `results.js`

```javascript
const LoteriaConfig = {
    // Cambia a true
    DRAW_COMPLETED: true,
    
    RESULTS: {
        // Rellena con los números ganadores oficiales
        gordo: '12345',          // Número del Gordo
        segundo: '67890',        // Número del 2º premio
        tercero: '11111',        // Número del 3er premio
        cuartos: ['22222', '33333'],                    // 2 números
        quintos: ['44444', '55555', '66666', '77777',   // 8 números
                  '88888', '99999', '00000', '10101'],
        pedrea: ['00001', '00023', ...]                 // 1.794 números
    }
};
```

### 2. (Opcional) Cargar desde API Externa

Descomenta la función `fetchOfficialResults()` en `results.js` y configura `RESULTS_API_URL` con la URL del JSON oficial.

### 3. Fuentes Oficiales de Resultados

- [Loterías y Apuestas del Estado](https://www.loteriasyapuestas.es)
- [RTVE - Sorteo en directo](https://www.rtve.es/loteria-navidad/)

## 🎨 Sistema de Diseño

El sitio utiliza CSS variables para mantener consistencia visual:

```css
:root {
    --color-primary: #b91c1c;       /* Rojo navideño */
    --color-secondary: #d97706;     /* Dorado */
    --color-gold: #fbbf24;          /* Oro para premios */
    /* ... más variables en styles.css */
}
```

### Personalización

Modifica las variables en `:root` de `styles.css` para cambiar:
- Colores principales
- Tipografía
- Espaciados
- Sombras y bordes

## 📱 Responsive

El sitio es **mobile-first** y se adapta a:
- Móviles (< 480px)
- Tablets (480px - 768px)
- Desktop (> 768px)

## 📊 SEO

Incluye:
- Meta tags Open Graph y Twitter Cards
- Schema JSON-LD para FAQ
- Schema JSON-LD para WebSite
- Etiquetas semánticas HTML5
- Atributos ARIA para accesibilidad

## 🔧 Espacios Publicitarios

El sitio incluye 3 slots de anuncios con atributos `data-ad`:

```html
<div class="ad-slot" data-ad="top">...</div>
<div class="ad-slot" data-ad="mid">...</div>
<div class="ad-slot" data-ad="bottom">...</div>
```

Para integrar con tu red publicitaria, reemplaza el contenido de `.ad-slot` con el código de tu proveedor.

## ⚠️ Aviso Legal

Este sitio web **no está afiliado** con Loterías y Apuestas del Estado ni con ningún organismo oficial. La información tiene carácter meramente informativo y de entretenimiento.

## 📝 TODO para Día del Sorteo

- [ ] Actualizar `DRAW_COMPLETED` a `true` en `results.js`
- [ ] Rellenar `RESULTS.gordo` con el número ganador
- [ ] Rellenar `RESULTS.segundo` con el 2º premio
- [ ] Rellenar `RESULTS.tercero` con el 3er premio
- [ ] Rellenar `RESULTS.cuartos` con los 2 números del 4º premio
- [ ] Rellenar `RESULTS.quintos` con los 8 números del 5º premio
- [ ] Rellenar `RESULTS.pedrea` con los 1.794 números de la pedrea
- [ ] (Opcional) Configurar `RESULTS_API_URL` para carga automática
- [ ] Desplegar cambios a GitHub Pages

## 📄 Licencia

MIT License - Libre para uso personal y comercial.
