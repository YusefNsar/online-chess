import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalComponent } from './local/local.component';
import { GameStateService } from './services/game-state.service';

@NgModule({
  declarations: [LocalComponent],
  providers: [GameStateService],
  imports: [CommonModule],
  exports: [LocalComponent],
})
export class LocalModule {}
