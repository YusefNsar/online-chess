import { Injectable } from '@angular/core';
import { GameState } from '../../types/local.types';


@Injectable()
export class GameStateService {
  private readonly STORAGE_KEY = 'chess_game_state';

  saveGameState(state: GameState) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }

  loadGameState(): GameState | null {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  }

  clearGameState() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}