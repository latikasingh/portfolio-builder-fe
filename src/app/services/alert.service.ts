import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private toastService: ToastrService) {}

  displayErrorToasts = (message: string) => {
    this.toastService.error('Error', message, {
      closeButton: true,
      progressBar: true,
      newestOnTop: true,
      timeOut: 2500,
    });
  };

  displaySuccessToasts = (message: string) => {
    this.toastService.success('Success', message, {
      closeButton: true,
      progressBar: true,
      newestOnTop: true,
      timeOut: 2500,
    });
  };
}
