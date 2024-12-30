import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  @Input() options: { value: string; label: string }[] = [];
  @Input() control: FormControl;
  @Input() placeholder: string = 'Select option';
  @Input() value = '';
  @Input() errors: { name: string; message: string }[] = [];
}
