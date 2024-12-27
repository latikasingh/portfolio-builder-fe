import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
})
export class TextareaComponent {
  @Input() control: FormControl;
  @Input() classList: string;
  @Input() value: string;
  @Input() errors: { name: string; message: string }[] = [];

  @Output() triggerChange = new EventEmitter<string>();

  onChange(ev: string) {
    this.triggerChange.emit(ev);
  }
}
