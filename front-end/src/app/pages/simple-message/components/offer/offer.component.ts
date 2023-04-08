import { Component, NgZone } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent {

  constructor(
    private _zone: NgZone
  ) { }

  private _peer: RTCPeerConnection & { dc?: RTCDataChannel } = new RTCPeerConnection();

  offerData: string = '';
  step: number = 0;
  steps: MenuItem[] = [
    { label: 'สร้าง Offer' },
    { label: 'คัดลอก Offer' },
    { label: 'ยืนยัน Answer' },
  ];

  /** เมื่อกดปุ่มสร้างข้อมูล Offer */
  createOffer() {
    this._peer.dc = this._peer.createDataChannel("channel");
    this._peer.dc.onopen = () => this._onChannelOpen();
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

  /** เมื่อเชื่อมต่อสำเร็จ */
  private _onChannelOpen() {
    console.log('Open successfully');
  }

  /** เมื่ออีกเครื่องส่งข้อความมา */
  private _onChannelMessage(ev: MessageEvent<string>) {
    console.log('Message: ', ev.data);
  }
}
