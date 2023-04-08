import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleMessageRoutingModule } from './simple-message-routing.module';
import { OfferComponent } from './components/offer/offer.component';
import { AnswerComponent } from './components/answer/answer.component';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './components/chat/chat.component';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

@NgModule({
  declarations: [
    OfferComponent,
    AnswerComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    SimpleMessageRoutingModule,
    StepsModule,
    CardModule,
    ButtonModule,
    InputTextareaModule,
    MessageModule,
    FormsModule,
    InputTextModule,
    PanelModule
  ]
})
export default class SimpleMessageModule { }
