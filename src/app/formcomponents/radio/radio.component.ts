import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatRadioModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
})
export class RadioComponent {
  @Input() radioOptions: { value: string | boolean; label: string }[];
  @Input() control: FormControl;
  @Input() value: string;
  @Input() errors: { name: string; message: string }[] = [];
}
