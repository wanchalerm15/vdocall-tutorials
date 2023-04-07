import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleMessageRoutingModule } from './simple-message-routing.module';
import { OfferComponent } from './components/offer/offer.component';
import { AnswerComponent } from './components/answer/answer.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    OfferComponent,
    AnswerComponent,
  ],
  imports: [
    CommonModule,
    SimpleMessageRoutingModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    FormsModule,
    CardModule,
  ]
})
export default class SimpleMessageModule { }
