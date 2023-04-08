import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent {

  step: number = 0;
  steps: MenuItem[] = [
    { label: 'สร้าง Offer' },
    { label: 'คัดลอก Offer' },
    { label: 'ยืนยัน Answer' },
  ];

}
