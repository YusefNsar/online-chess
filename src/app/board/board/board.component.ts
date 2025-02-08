import { Component, ViewChild, OnInit } from '@angular/core';
import { MoveChange, NgxChessBoardView } from 'ngx-chess-board';
import { GameEvents } from '../../types/local.types';

@Component({
  selector: 'app-iframe-page',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @ViewChild('board') board!: NgxChessBoardView;
  isPlayerBlack = false;
  isPlayerTurn = true;
  lastMove: string = '';
  boardSize: number = 400;

  ngOnInit() {
    // determine if this is the second board based on iframe index
    window.addEventListener('message', this.handleMessage.bind(this));
    this.boardSize = window.innerWidth;
  }

  ngAfterViewInit() {
    // use setTimeout to let angular finish changes detection cycle before changing state
    setTimeout(() => {
      this.isPlayerBlack = window.parent.frames[1] === window;
      this.handleBlackPlayerBoard()
    })
  }

  onMoveChange(moveChange: MoveChange) {
    const move = (moveChange as any).move;
    if (move === this.lastMove) {
      return;
    }
    this.lastMove = move;

    window.parent.postMessage({
      type: GameEvents.MOVE,
      move,
      fen: moveChange.fen
    }, '*');

    if (moveChange.checkmate) {
      window.parent.postMessage({
        type: GameEvents.CHECKMATE,
        winner: this.isPlayerBlack ? 'Black' : 'White'
      }, '*');
    }

    this.isPlayerTurn = !this.isPlayerTurn;
  }

  handleMessage(event: MessageEvent) {
    if (event.data.type === GameEvents.MOVE) {
      this.lastMove = event.data.move;
      this.board.move(event.data.move);
      this.isPlayerTurn = !this.isPlayerTurn;
    }
    if (event.data.type === GameEvents.NEW_GAME) {
      this.lastMove = '';
      this.board.reset();
      this.handleBlackPlayerBoard()
    }
    if (event.data.type === GameEvents.LOAD_GAME) {
      console.log(event.data.fen)
      this.board.setFEN(event.data.fen);
      this.handleBlackPlayerBoard(event.data.isBlackTurn);
    }
  }

  private handleBlackPlayerBoard(isBlackTurn = false) {
    if (this.isPlayerBlack) {
      this.board.reverse();
      this.isPlayerTurn = isBlackTurn;
    } else {
      this.isPlayerTurn = !isBlackTurn;
    }
  }
}