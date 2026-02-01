import type { TrainingOutsSessionInitDto } from "../contracts/outs.dto";
import type { OutsSession } from "../../domain/outs/outs.session";

export function mapOutsSessionInitDtoToDomain(
  dto: TrainingOutsSessionInitDto,
): OutsSession {
  return {
    sessionId: dto.sessionId,
    street: dto.street,
    hole: dto.hole,
    cards: dto.cards,
  };
}
