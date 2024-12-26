import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from '../../modals/user.modal';
import { selectAuthUser } from '../../store/auth/auth.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Output() selectedTabOption = new EventEmitter<string>();

  user$: Observable<IUser>;
  constructor(
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.select(selectAuthUser);
  }

  onSelectSection(tab: string) {
    this.selectedTabOption.emit(tab);
  }

  redirectToSettings() {
    this.router.navigate(['settings']);
  }
}
