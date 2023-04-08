import { Component, NgZone } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent {

  constructor(
    private _message: MessageService,
    private _zone: NgZone,
  ) { }

  private _peer: RTCPeerConnection & { dc?: RTCDataChannel } = new RTCPeerConnection();
  offerData: string = '';
  answerData: string = '';

  step: number = 0;
  steps: MenuItem[] = [
    { label: 'เก็บ Offer' },
    { label: 'สร้าง Answer' },
    { label: 'คัดลอก Answer' },
  ];

  /** เก็บข้อมูล Offer */
  storeOffer() {
    if (!this.offerData)
      return this._message.add({ severity: 'warn', summary: 'แจ้งเตือน', detail: 'กรุณากรอกข้อมูล Offer' });
    this.step = 1;
  }

  /** สร้างข้อมูล Answer */
  createAnswer() {
    this._peer.ondatachannel = ev => {
      this._peer.dc = ev.channel;
      this._peer.dc.onopen = () => this._onChannelOpen();
      this._peer.dc.onmessage = ev => this._onChannelMessage(ev);
    };

    this._peer.onicecandidate = ev => {
      if (!ev.candidate) return;
      this._zone.run(() => {
        this.answerData = JSON.stringify(this._peer.localDescription);
        this.step = 2;
      });
    };

    this._peer.setRemoteDescription(JSON.parse(this.offerData));
    this._peer.createAnswer().then(answer => this._peer.setLocalDescription(answer));
  }

  /** เมื่อเชื่อมต่อสำเร็จ */
  private _onChannelOpen() {
    console.log('Open successfully');
  }

  /** เมื่ออีกเครื่องส่งข้อความมา */
  private _onChannelMessage(ev: MessageEvent<string>) {
    console.log('Message: ', ev.data);
  }

}
