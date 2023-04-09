import { Component, NgZone } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent {

  constructor(
    private _message: MessageService,
    private _zone: NgZone
  ) {
    this._initalizeLoadDevices();
    this._peer.onconnectionstatechange = () => {
      this._zone.run(() => {
        this._message.add({ severity: 'info', summary: 'แจ้งเตือนการเชื่อมต่อ', detail: this._peer.connectionState });
        switch (this._peer.connectionState) {
          case 'connected':
            this.connected = true;
            break;
          case 'disconnected':
            this.step = 0;
            this.offerData = '';
            this.answerData = '';
            this.connected = false;
            break;
        }
      });
    };
  }

  private _peer: RTCPeerConnection & { dc?: RTCDataChannel } = new RTCPeerConnection();

  localStream?: MediaStream;
  devliceItem = {
    videos: [] as MediaDeviceInfo[],
    audios: [] as MediaDeviceInfo[]
  };

  videoDevice: string = '';
  audioDevice: string = '';

  connected: boolean = false;
  offerData: string = '';
  answerData: string = '';
  step: number = 0;
  steps: MenuItem[] = [
    { label: 'เปิดกล้อง' },
    { label: 'สร้าง Offer' },
    { label: 'คัดลอก Offer' },
    { label: 'ยืนยัน Answer' },
  ];

  /** เปิดกล้องและไมค์ */
  async openStream() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: this.videoDevice } },
        audio: { deviceId: { exact: this.audioDevice } }
      });
    }
    catch (ex: any) {
      this._message.add({ severity: 'error', summary: 'เปิดกล้องไม่ได้', detail: ex.message });
    }
  }

  /** เมื่อกดปุ่มสร้างข้อมูล Offer */
  createOffer() {
    this._peer.dc = this._peer.createDataChannel("channel");
    this._peer.dc.onmessage = ev => this._onChannelMessage(ev);
    this._peer.onicecandidate = ev => {
      if (!ev.candidate) return;
      this._zone.run(() => {
        this.offerData = JSON.stringify(this._peer.localDescription);
        this.step = 1;
      });
    };
    this._peer.createOffer().then(offer => this._peer.setLocalDescription(offer));
  }

  /** ยืนยันข้อมูล Answer */
  confirmAnswer() {
    if (!this.answerData)
      return this._message.add({ severity: 'warn', summary: 'แจ้งเตือน', detail: 'กรุณากรอกข้อมูล Offer' });
    this._peer.setRemoteDescription(JSON.parse(this.answerData));
  }

  /** เมื่ออีกเครื่องส่งข้อความมา */
  private _onChannelMessage(ev: MessageEvent<string>) {
    this._zone.run(() => {
      console.log('Message: ', ev.data);
    });
  }

  /** โหลดข้อมูล device กล้องและไมค์ */
  private async _initalizeLoadDevices() {
    const deviceItems = await navigator.mediaDevices.enumerateDevices();
    deviceItems.forEach(item => {
      switch (item.kind) {
        case 'audioinput':
          this.devliceItem.audios.push(item);
          break;
        case 'videoinput':
          this.devliceItem.videos.push(item);
          break;
      }
    });

    if (this.devliceItem.videos.length > 0) this.videoDevice = this.devliceItem.videos[0].deviceId;
    if (this.devliceItem.audios.length > 0) this.audioDevice = this.devliceItem.audios[0].deviceId;
  }
}
