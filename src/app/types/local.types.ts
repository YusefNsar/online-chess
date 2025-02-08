export enum GameEvents {
  MOVE = 'MOVE',
  CHECKMATE = 'CHECKMATE',
  NEW_GAME = 'NEW_GAME',
  LOAD_GAME = 'LOAD_GAME',
}

export interface GameState {
  fen: string;
  isBlackTurn: boolean;
}