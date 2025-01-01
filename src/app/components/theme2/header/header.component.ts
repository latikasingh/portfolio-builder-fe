import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../../modals/user.modal';
import { Store } from '@ngrx/store';
import { selectWebsiteUser } from '../../../store/website/user/user.selector';

@Component({
  selector: 'app-theme2-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  user$: Observable<IUser>;
  links: string[] = [];
  selectedTabOption = new EventEmitter<string>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.user$ = this.store.select(selectWebsiteUser);
    this.links = ['Home', 'About', 'Skills', 'Resume', 'Portfolio', 'Services'];
  }

  onSelectSection(tab: string) {
    this.selectedTabOption.emit(tab);
  }
}
