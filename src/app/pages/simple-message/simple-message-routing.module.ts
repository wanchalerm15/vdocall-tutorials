import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferComponent } from './components/offer/offer.component';
import { AnswerComponent } from './components/answer/answer.component';

const routes: Routes = [
  { path: '', redirectTo: 'offer', pathMatch: 'full' },
  { path: 'offer', component: OfferComponent },
  { path: 'answer', component: AnswerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimpleMessageRoutingModule { }
