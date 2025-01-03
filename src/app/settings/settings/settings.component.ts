import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { Observable, take } from 'rxjs';
import { IUser } from '../../modals/user.modal';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../store/auth/auth.selector';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  currentChildRoute: string;
  authUser$: Observable<IUser>;
  userId: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.authUser$ = this.store.select(selectAuthUser);
    this.authUser$.pipe(take(2)).subscribe((user) => {
      if (user) {
        this.userId = user.id;
      }
    });
  }

  get currentActiveTab() {
    return this.route.snapshot.firstChild.url[0].path.toString();
  }

  previewWebsite() {
    console.log(environment.APP_URL);

    window.open(`${environment.APP_URL}/portfolio/${this.userId}`, '_blank');
  }
}
