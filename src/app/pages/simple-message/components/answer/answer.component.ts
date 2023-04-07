import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent {

  private _peer: RTCPeerConnection & { dc?: RTCDataChannel } = new RTCPeerConnection();
  public offerData: string = '';
  public answerData: string = '';
  public isConnected = false;
  public messageItems: { isMe: boolean, text: string }[] = [];

  constructor(private _detect: ChangeDetectorRef) {
    this._peer.onconnectionstatechange = ev => {
      console.log(this._peer.connectionState);
    }
  }

  onCreateAnswer() {
    this._peer.ondatachannel = ev => {
      this._peer.dc = ev.channel;
      this._peer.dc.onopen = this._initializeChannelOpen.bind(this);
      this._peer.dc.onmessage = this._initializeChannelMessage.bind(this);
    };
    this._peer.setRemoteDescription(JSON.parse(this.offerData));
    this._peer.onicecandidate = ev => {
      if (!ev.candidate) return;
      this.answerData = JSON.stringify(this._peer.localDescription);
      this._detect.detectChanges();
    };
    this._peer.createAnswer().then(answer => this._peer.setLocalDescription(answer));
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