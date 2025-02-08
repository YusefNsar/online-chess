import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { NgxChessBoardModule } from 'ngx-chess-board';

@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    NgxChessBoardModule,
  ]
})
export class BoardModule { }
