import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatAutocompleteModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() isReadOnly: boolean = false;
  @Input() placeholder: string = 'Input';
  @Input() classList: string = '';
  @Input() control!: FormControl;
  @Input() errors: { name: string; message: string }[] = [];

  @Input() value: string = '';
}
