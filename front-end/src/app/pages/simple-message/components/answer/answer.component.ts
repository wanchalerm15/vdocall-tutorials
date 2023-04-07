import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent {

  step: number = 0;
  steps: MenuItem[] = [
    { label: 'เก็บ Offer' },
    { label: 'สร้าง Answer' },
    { label: 'คัดลอก Answer' },
  ];

}