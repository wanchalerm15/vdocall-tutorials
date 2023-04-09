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
    { label: 'เก็บ Offer' },
    { label: 'เปิดกล้อง' },
    { label: 'สร้าง Answer' },
    { label: 'คัดลอก Answer' },
  ];

  /** เก็บข้อมูล Offer */
  storeOffer() {
    if (!this.offerData)
      return this._message.add({ severity: 'warn', summary: 'แจ้งเตือน', detail: 'กรุณากรอกข้อมูล Offer' });
    this.step = 1;
  }

  /** เปิดกล้องและไมค์ */
  async openStream() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: this.videoDevice } },
        audio: { deviceId: { exact: this.audioDevice } }
      });
      this.step = 2;
    }
    catch (ex: any) {
      this._message.add({ severity: 'error', summary: 'เปิดกล้องไม่ได้', detail: ex.message });
    }
  }

  /** สร้างข้อมูล Answer */
  createAnswer() {
    if (!this.localStream)
      return this._message.add({ severity: 'warn', summary: 'แจ้งเตือน', detail: 'ไม่มีข้อมูล Stream' });

    this.localStream.getTracks().forEach(track => this._peer.addTrack(track, this.localStream!));
    this._peer.onicecandidate = ev => {
      if (!ev.candidate) return;
      this._zone.run(() => {
        this.answerData = JSON.stringify(this._peer.localDescription);
        this.step = 3;
      });
    };

    this._peer.setRemoteDescription(JSON.parse(this.offerData));
    this._peer.createAnswer().then(answer => this._peer.setLocalDescription(answer));
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
