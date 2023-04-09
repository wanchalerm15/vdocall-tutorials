import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'simple-message',
    loadChildren: () => import('./pages/simple-message/simple-message.module')
  },
  {
    path: 'simple-stream',
    loadChildren: () => import('./pages/simple-stream/simple-stream.module')
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
