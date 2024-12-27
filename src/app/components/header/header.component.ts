import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from '../../modals/user.modal';
import { Router } from '@angular/router';
import { selectWebsiteUser } from '../../store/website/user/user.selector';

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
    this.user$ = this.store.select(selectWebsiteUser);
  }

  onSelectSection(tab: string) {
    this.selectedTabOption.emit(tab);
  }

  redirectToSettings() {
    this.router.navigate(['settings']);
  }

  goToLink(link: string) {
    if (!link.startsWith('http://') && !link.startsWith('https://')) {
      link = 'https://' + link;
    }
    window.open(link, '_blank');
  }
}
