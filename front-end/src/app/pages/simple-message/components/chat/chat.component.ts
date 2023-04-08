import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IChat } from '../../intefaces/chat.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  constructor(
    private _message: MessageService
  ) { }

  @Input('channel') channel?: RTCDataChannel;
  @Input('items') items: IChat[] = [];
  @Output('itemsChange') itemsChange = new EventEmitter<IChat[]>();

  text: string = '';

  onSubmit() {
    if (!this.text)
      return this._message.add({ severity: 'warn', summary: 'แจ้งเตือน', detail: 'กรุณากรอกข้อความก่อนส่ง' });
    this.items.push({ isMe: true, text: this.text });
    this.itemsChange.emit(this.items);
    this.channel?.send(this.text);
    this.text = '';
  }
}
