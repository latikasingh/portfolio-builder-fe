import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  freelancerOption: { label: string; value: string | boolean }[] = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ];
}
