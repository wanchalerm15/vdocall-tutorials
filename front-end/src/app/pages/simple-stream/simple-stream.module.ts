import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleStreamRoutingModule } from './simple-stream-routing.module';
import { CardModule } from 'primeng/card';
import { OfferComponent } from './components/offer/offer.component';
import { AnswerComponent } from './components/answer/answer.component';
import { StepsModule } from 'primeng/steps';
import { MessageModule } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { StreamComponent } from './components/stream/stream.component';

@NgModule({
  declarations: [
    OfferComponent,
    AnswerComponent,
    StreamComponent
  ],
  imports: [
    CommonModule,
    SimpleStreamRoutingModule,
    CardModule,
    StepsModule,
    MessageModule,
    FormsModule,
    ButtonModule,
    InputTextareaModule,
    DropdownModule,
  ]
})
export default class SimpleStreamModule { }
