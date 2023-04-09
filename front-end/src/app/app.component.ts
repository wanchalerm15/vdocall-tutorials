import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: MenuItem[] = [
    { label: 'Simple message', routerLink: ['/simple-message'] },
    { label: 'Simple stream', routerLink: ['/simple-stream'] },
  ];

}
