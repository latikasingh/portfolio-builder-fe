import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isOpen: boolean = true;
  @Input() isEditMode: boolean = false;
  @Output() closeModal = new EventEmitter<boolean>();

  closeDialog() {
    this.isOpen = false;
    this.closeModal.emit(false);
  }
}
