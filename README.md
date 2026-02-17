# 🃏 Board Lab — Frontend

**Board Lab** es una app de entrenamiento de poker para mejorar **lectura de boards** y **cálculo de outs**, con feedback **street a street** (flop → turn → river).

No pretende ser un solver ni un calculador perfecto: está diseñada para aprender **patrones, razonamiento y errores comunes** con explicaciones claras y accionables.

---

## ✨ Features actuales

- ✅ Entrenamiento street a street (flop → turn → river)
- ✅ Feedback inmediato con explicación
- ✅ “Pedir carta” para avanzar a la siguiente street (sin avanzar automáticamente)
- ✅ Botón **Nueva mano** en cualquier momento
- ✅ UI responsive + modo de cartas (skin) configurable

---

## 🚀 Stack

- ⚛️ React + TypeScript
- ⚡ Vite
- 🎨 CSS modular por componente
- 🌐 API REST (backend propio en NestJS)

---

## 🧠 Modos de entrenamiento

### 🟢 Texture Trainer

Entrena la **lectura de textura del board**.

**Flujo**

1. Se inicia una mano
2. Se muestra el board por streets (flop → turn → river)
3. El usuario clasifica la textura:
   - Seca
   - Semi-coordinada
   - Coordinada
   - Súper coordinada
4. El sistema valida y explica la respuesta
5. El usuario decide cuándo avanzar con **Pedir carta**

**Objetivo**

- Lectura rápida de mesas
- Entender cómo cambia la textura street a street

---

### 🔵 Outs Trainer

Entrena el **cálculo de outs ajustadas según la mesa**.

**Flujo**

1. Se genera una mano con hole cards + board
2. El usuario introduce el número de outs
3. El sistema devuelve:
   - Veredicto (correcta / incorrecta)
   - Outs correctas
   - Explicación en lenguaje humano
4. El usuario decide cuándo avanzar con **Pedir carta**
5. Se puede reiniciar en cualquier momento con **Nueva mano**

**Componentes (ejemplos)**

- Overcards
- Proyecto de color
- Proyecto de escalera

**Ajustes**

- Textura del board
- Mesa emparejada
- Coordinación
- Fuerza relativa del proyecto

---

## 🧩 Próximas mejoras (roadmap)

- 🔒 Hand Strength Trainer (próximamente)
- 👤 Usuarios y sesiones guardadas (progreso / scores)
- 📊 Estadísticas por tipo de spot
- 🎨 Mejoras visuales (mesa, animaciones, skins extra)
- 🧠 Equity aproximada (enfoque pedagógico, no solver)

---

## 🛠️ Cómo ejecutar

```bash
npm install
npm run dev
```

## License

This project is licensed under the MIT License.

