import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() placeholder: string = 'Input';
  @Input() classList: string = '';
  @Input() control!: FormControl;
  @Input() errors: { name: string; message: string }[] = [];

  value: string = '';
}
