import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferComponent {
  private _peer: RTCPeerConnection & { dc?: RTCDataChannel } = new RTCPeerConnection();

  offerData: string = '';
  answerData: string = 'ssss';
  isConnected: boolean = false;
  messageItems: { isMe: boolean, text: string }[] = [];

  constructor(private _detect: ChangeDetectorRef) {
    this._peer.onconnectionstatechange = ev => {
      console.log(this._peer.connectionState);
    }
  }

  onCreateOffer() {
    this._peer.dc = this._peer.createDataChannel('ch1');
    this._peer.dc.onopen = this._initializeChannelOpen.bind(this);
    this._peer.dc.onmessage = this._initializeChannelMessage.bind(this);
    this._peer.onicecandidate = ev => {
      if (!ev.candidate) return;
      this.offerData = JSON.stringify(this._peer.localDescription);
      this._detect.detectChanges();
    };
    this._peer.createOffer().then(offer => this._peer.setLocalDescription(offer));
  }

  onAcceptAnswer() {
    this._peer.setRemoteDescription(JSON.parse(this.answerData));
  }

  onSendMessage(input: HTMLInputElement) {
    const value = input.value.trim();
    if (value) {
      this.messageItems.push({ isMe: true, text: value });
      this._peer.dc?.send(value);
    }
    input.value = '';
    this._detect.detectChanges();
  }

  private _initializeChannelOpen() {
    this.isConnected = true;
    this._detect.detectChanges();
  }

  private _initializeChannelMessage(ev: MessageEvent<string>) {
    this.messageItems.push({ isMe: false, text: ev.data });
    this._detect.detectChanges();
  }

}
