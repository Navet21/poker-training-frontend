# 🃏 Poker Training App – Frontend

Aplicación de entrenamiento de poker centrada en **lectura de boards** y **cálculo de outs ajustadas**, diseñada para estudiar spots reales de forma progresiva (flop → turn → river).

Este frontend consume una API propia y está pensado como herramienta de **aprendizaje**, no como solver automático.

---

## 🚀 Tecnologías

- ⚛️ React + TypeScript
- ⚡ Vite
- 🎨 CSS modular por componente
- 🌐 API REST (backend propio en NestJS)

---

## 🧠 Modos de entrenamiento

### 🟢 1. Texture Trainer
Entrena la **lectura de textura del board**.

**Flujo:**
1. Se genera una sesión
2. Se muestra el board por streets (flop → turn → river)
3. El usuario clasifica la textura:
   - Seca
   - Semi-coordinada
   - Coordinada
   - Súper coordinada
4. El sistema valida y explica la respuesta

Este modo ayuda a:
- Mejorar lectura rápida de mesas
- Entender cómo cambia la textura street a street

---

### 🔵 2. Outs Trainer
Entrena el **cálculo de outs ajustadas según la mesa**.

**Flujo:**
1. Se genera una mano con:
   - Hole cards
   - Board
2. El usuario introduce el número de outs
3. El sistema responde con:
   - Si es correcta o no
   - Outs reales
   - Breakdown por componentes
   - Explicación **en lenguaje humano**, basada en reglas de estudio

**Ejemplos de componentes:**
- Overcards
- Proyecto de color
- Proyecto de escalera

Las outs se ajustan según:
- Textura
- Mesa emparejada
- Coordinación
- Fuerza relativa del proyecto