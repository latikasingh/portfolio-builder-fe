import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IServiceDto } from '../../../modals/service.modal';
import { Store } from '@ngrx/store';
import { selectWebsiteServiceData } from '../../../store/website/user/user.selector';

@Component({
  selector: 'app-theme2-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit {
  servicesData$: Observable<IServiceDto>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.servicesData$ = this.store.select(selectWebsiteServiceData);
  }
}
