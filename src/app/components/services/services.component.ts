import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IServiceDto } from '../../modals/service.modal';
import { Observable } from 'rxjs';
import { selectWebsiteServiceData } from '../../store/website/user/user.selector';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit {
  services$: Observable<IServiceDto>;
  constructor(
    private store: Store,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.services$ = this.store.select(selectWebsiteServiceData);
  }

  getSanitizedIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}
