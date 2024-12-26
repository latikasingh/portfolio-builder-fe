import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { IUser } from './modals/user.modal';
import { selectAuthUser } from './store/auth/auth.selector';
import { getUser } from './store/auth/auth.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  user$: Observable<IUser>;
  constructor(
    private authService: AuthService,
    private store: Store,
  ) {
    this.user$ = this.store.select(selectAuthUser);
  }

  ngOnInit(): void {
    this.user$.pipe(take(2)).subscribe((user) => {
      if (user === null && this.authService.getUserToken()) {
        this.store.dispatch(getUser());
      }
    });
  }
}
