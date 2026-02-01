import type { OutsAnswer, OutsComponentKind } from "../../domain/outs/out.types";
import type {
  TrainingOutsAnswerDto,
  OutsComponentDto,
} from "../contracts/outs.dto";


function mapComponentKind(type: OutsComponentDto["type"]): OutsComponentKind {
  switch (type) {
    case "OVER_CARDS":
      return "overcards";
    case "FLUSH_DRAW":
      return "flush_draw";
    case "STRAIGHT_DRAW":
      return "straight_draw";
    case "BACKDOOR_STRAIGHT":
      return "backdoor_straight";
    case "BACKDOOR_FLUSH":
      return "backdoor_flush";

    default: {
      // Si mañana el backend mete otro tipo y no lo mapeas, que explote aquí
      // para enterarte rápido.
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
}

function mapStraightPressure(
  p: TrainingOutsAnswerDto["meta"]["straightPressure"],
): "none" | "two_card" | "one_card" {
  switch (p) {
    case "none":
      return "none";
    case "two_card_straight_possible":
      return "two_card";
    case "one_card_straight_possible":
      return "one_card";
  }
}

export function mapOutsAnswerDtoToDomain(dto: TrainingOutsAnswerDto): OutsAnswer {
  return {
    verdict: dto.correct ? "correct" : "incorrect",
    street: dto.street,

    userOuts: dto.userOuts,
    correctOuts: dto.correctOuts,

    explanation: dto.explanation,
    components: dto.components.map((c) => ({
      kind: mapComponentKind(c.type),
      outs: c.outs,
      reason: c.reason,
    })),

    flags: {
      pairedType: dto.meta.pairedType,
      isPaired88Plus: dto.meta.isPaired88Plus,
      flushState: dto.meta.flushState,
      straightPressure: mapStraightPressure(dto.meta.straightPressure),
      texture: dto.meta.texture,
    },

    finished: dto.finished,

    next:
      !dto.finished && dto.nextStreet && dto.nextCards
        ? { street: dto.nextStreet, board: dto.nextCards }
        : undefined,
  };
}
