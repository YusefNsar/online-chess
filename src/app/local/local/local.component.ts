import { Component, ElementRef, ViewChild } from '@angular/core';
import { GameStateService } from '../services/game-state.service';
import { GameEvents } from '../../types/local.types';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss'],
})
export class LocalComponent {
  @ViewChild('iframe1') iframe1!: ElementRef;
  @ViewChild('iframe2') iframe2!: ElementRef;
  iframe1Window!: Window;
  iframe2Window!: Window;
  readyIframes: number = 0;
  isBlackTurn = false;

  constructor(private gameStateService: GameStateService) {}

  ngOnInit() {
    window.addEventListener('message', this.handleMessage.bind(this));
  }

  ngAfterViewInit() {
    this.iframe1Window = this.iframe1.nativeElement.contentWindow;
    this.iframe2Window = this.iframe2.nativeElement.contentWindow;
  }

  loadOnceReady() {
    this.readyIframes++;
    if (this.readyIframes === 2) {
      this.loadSavedGame()
    }
  }

  handleMessage(event: MessageEvent) {
    if (!this.isValidMessage(event)) {
      return;
    }

    if (event.data.type === GameEvents.MOVE) {
      this.isBlackTurn = !this.isBlackTurn;
      // broadcast move to other iframe
      const targetIframe =
        event.source === this.iframe1Window
          ? this.iframe2Window
          : this.iframe1Window;
      targetIframe.postMessage(event.data, '*');

      // save game state
      this.gameStateService.saveGameState({
        fen: event.data.fen,
        isBlackTurn: this.isBlackTurn,
      });
    }

    if (event.data.type === GameEvents.CHECKMATE) {
      alert(`Game Over! ${event.data.winner} wins!`);
    }
  }

  loadSavedGame() {
    const savedState = this.gameStateService.loadGameState();
    if (savedState) {
      this.iframe1Window.postMessage(
        { type: GameEvents.LOAD_GAME, ...savedState },
        '*'
      );
      this.iframe2Window.postMessage(
        { type: GameEvents.LOAD_GAME, ...savedState },
        '*'
      );
      this.isBlackTurn = savedState.isBlackTurn;
    }
  }

  newGame() {
    this.isBlackTurn = false;
    this.gameStateService.clearGameState();
    this.iframe1Window.postMessage({ type: GameEvents.NEW_GAME }, '*');
    this.iframe2Window.postMessage({ type: GameEvents.NEW_GAME }, '*');
  }

  isValidMessage(event: MessageEvent) {
    if (
      event.source !== this.iframe1Window &&
      event.source !== this.iframe2Window
    ) {
      return false;
    }

    return Object.values(GameEvents).includes(event.data?.type);
  }
}
