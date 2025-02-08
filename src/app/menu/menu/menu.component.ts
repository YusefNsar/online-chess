import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  gameMode: GameMode = 'Local';

  constructor() {}


  setGameMode(mode: GameMode) {
    this.gameMode = mode;
  }
}

export type GameMode = 'Online' | 'Local' | null;