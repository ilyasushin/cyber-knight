import type { MiniGameRegistry } from "../types/miniGame";
import { GameEasyMoneySwipe } from "./GameEasyMoneySwipe";
import { GameLieDetector } from "./GameLieDetector";
import { GameMalwareSweep } from "./GameMalwareSweep";
import { GamePhishing } from "./GamePhishing";

/** Реестр мини-игр по номеру этапа — точка подмены на реальные реализации. */
export const miniGames: MiniGameRegistry = {
  1: GameLieDetector,
  2: GamePhishing,
  3: GameMalwareSweep,
  4: GameEasyMoneySwipe,
};
