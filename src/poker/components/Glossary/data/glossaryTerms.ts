import type { GlossaryTerm } from "./glossary.types";



export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: "Board",
    definition:
      "Las cartas comunitarias que se reparten en la mesa y que todos los jugadores pueden usar.",
    category: "general",
  },
  {
    term: "Flop",
    definition:
      "Las primeras tres cartas comunitarias que se reparten simultáneamente después de la primera ronda de apuestas.",
    category: "general",
  },
  {
    term: "Turn",
    definition: "La cuarta carta comunitaria que se reparte después del flop.",
    category: "general",
  },
  {
    term: "River",
    definition: "La quinta y última carta comunitaria.",
    category: "general",
  },
  {
    term: "Street",
    definition: "Cada fase del juego: preflop, flop, turn y river.",
    category: "general",
  },

  // Texturas
  {
    term: "Textura del board",
    definition:
      "Características del board que determinan qué tipo de manos son más probables. Se clasifican según la conectividad y coordinación de las cartas.",
    category: "texture",
  },
  {
    term: "Board seco",
    definition:
      "Un board con cartas desconectadas donde es difícil ligar proyectos de escalera o color. Ejemplo: K♥ 7♣ 2♦",
    category: "texture",
  },
  {
    term: "Board semi-coordinado",
    definition:
        "Board intermedio entre seco y coordinado. Hay cierta conexión entre cartas o posible proyecto de color, pero no suficientes combinaciones como para considerarlo muy peligroso.",
    category: "texture",
    },
  {
    term: "Board coordinado",
    definition:
      "Board donde el jugador puede conectar proyectos de escalera o color con las 2 cartas de su mano. Ejemplo: J♥ 10♥ 8♠",
    category: "texture",
  },
  {
    term: "Board súper coordinado",
    definition:
      "Board muy conectado donde el jugador tiene muchas posibilidades de completar proyectos de escalera o color a 1 sola carta. Ejemplo: 9♠ 8♠ 7♦ 6♦",
    category: "texture",
  },

  // Outs
  {
    term: "Outs",
    definition:
      "Cartas que quedan en el mazo que pueden mejorar tu mano para ganar el bote.",
    category: "outs",
  },
  {
    term: "Draw",
    definition:
      "Una mano que necesita mejorar para ganar, pero que tiene potencial (proyecto).",
    category: "outs",
  },
  {
    term: "Proyecto de color (Flush draw)",
    definition:
      "Cuando tienes 4 cartas del mismo palo entre tu mano y el board y necesitas una más para completar color. Ejemplo: A♥ Q♥ en un flop 7♥ 2♥ K♣. Normalmente son 9 outs.",
    category: "outs",
  },
  {
    term: "Proyecto de escalera abierta (OESD)",
    definition:
        "Cuando puedes completar una escalera con una carta por arriba o por abajo. Ejemplo: tienes 9♠ 8♦ y el flop es 7♣ 6♥ K♦. Un 10 o un 5 completan la escalera. Normalmente son 8 outs.",
    category: "outs",
    },
  {
    term: "Gutshot (Proyecto de escalera interna)",
    definition:
        "Proyecto en el que solo una carta concreta completa la escalera. Ejemplo: tienes 9♠ 8♦ y el flop es J♣ 10♥ 2♦. Solo un 7 te da escalera. Normalmente son 4 outs.",
    category: "outs",
    },

  {
    term: "Overcards",
    definition:
        "Cartas en tu mano que son más altas que cualquier carta del board. Si ligas una pareja con ellas, suele ser la mejor mano en ese momento.",
    category: "outs",
    },

  // Posiciones
  {
    term: "Posición",
    definition:
        "Tu lugar en la mesa respecto al botón. Cuanto más tarde actúas en una mano, más información tienes sobre tus rivales, lo que supone una gran ventaja.",
    category: "positions",
    },

  {
    term: "BTN (Botón)",
    definition:
        "La mejor posición en la mesa. Actúas último en todas las calles post-flop, lo que te da más información y control sobre el bote.",
    category: "positions",
    },
    {
    term: "SB (Small Blind)",
    definition:
        "Posición a la izquierda del botón. Debes poner una apuesta obligatoria pequeña antes de ver tus cartas y jugarás fuera de posición en la mayoría de las manos.",
    category: "positions",
    },
  {
    term: "BB (Big Blind)",
    definition:
        "Posición a la izquierda del small blind. Pones la apuesta obligatoria mayor antes de ver tus cartas y sueles actuar pronto en las rondas post-flop.",
    category: "positions",
    },
  {
    term: "UTG (Under The Gun)",
    definition:
        "Primera posición en hablar preflop. Actúas antes que casi todos los jugadores, por lo que necesitas manos más fuertes para jugar.",
    category: "positions",
    },

];
