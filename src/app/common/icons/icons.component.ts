import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.scss',
})
export class IconsComponent {
  @Input() iconName: string = '';
  @Input() width: string = '16px';
  @Input() height: string = '16px';
  @Input() color: string = '#000000';
}
