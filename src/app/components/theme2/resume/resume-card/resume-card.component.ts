import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-theme2-resume-card',
  templateUrl: './resume-card.component.html',
  styleUrl: './resume-card.component.scss',
})
export class ResumeCardComponent {
  @Input() title: string = '';
  @Input() bodyTitle: string = '';
  @Input() description: string = '';
  @Input() startYear: string = '';
  @Input() endYear: string = '';
}
