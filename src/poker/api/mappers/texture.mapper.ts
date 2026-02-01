import type { TrainingSessionInitDto, TrainingAnswerDto } from "../contracts/texture.dto";
import type { TextureSession, TextureAnswer } from "../../domain/texture/texture.types";

export function mapTextureSessionInitDtoToDomain(dto: TrainingSessionInitDto): TextureSession {
  return {
    sessionId: dto.sessionId,
    street: dto.street,
    board: dto.cards,
  };
}

export function mapTextureAnswerDtoToDomain(dto: TrainingAnswerDto): TextureAnswer {
  return {
    verdict: dto.correct ? "correct" : "incorrect",
    street: dto.street,
    correctTexture: dto.correctTexture,
    helpText: dto.helpText,
    finished: dto.finished,
    next:
      !dto.finished && dto.nextStreet && dto.nextCards
        ? { street: dto.nextStreet, board: dto.nextCards }
        : undefined,
  };
}
