import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu/menu.component';
import { BoardComponent } from './board/board/board.component';
import { MenuModule } from './menu/menu.module';
import { BoardModule } from './board/board.module';

const routes: Routes = [
  { path: 'mainpage', component: MenuComponent },
  { path: 'iframepage', component: BoardComponent },
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MenuModule, BoardModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
