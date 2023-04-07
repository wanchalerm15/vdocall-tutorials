import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleMessageRoutingModule } from './simple-message-routing.module';
import { OfferComponent } from './components/offer/offer.component';
import { AnswerComponent } from './components/answer/answer.component';


@NgModule({
  declarations: [
    OfferComponent,
    AnswerComponent
  ],
  imports: [
    CommonModule,
    SimpleMessageRoutingModule
  ]
})
export default class SimpleMessageModule { }
